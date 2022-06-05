import { $$ } from './selector'

/**
 * A representation of the selector to create components
 */
declare type Selector = SelectorType | SelectorFunction
declare type SelectorFunction = () => SelectorType | Promise<SelectorType>
declare type SelectorType = string | Array<string>

/**
 * A string representation of the DOM state that a component should have.
 * You can use it as a function to return dynamic templates based on the component state
 */
declare type Template = string | TemplateFunction
declare type TemplateFunction = (component: Component) => string | Promise<string>

/**
 * State is any data type that can be attached to one component.
 * It's recommended to use it as a return object that carries values
 */
declare type State = any

/**
 * Component representation object
 */
declare type Component = {

    /**
     * Main HTML element of this component
     */
    element: HTMLElement,

    /**
     * State data for the component
     */
    state: State,

    /**
     * Template representation of the component.
     * Fallbacks to element innerHTML if not declare
     */
    template: Template,

    /**
     * Render the template on HTML element and
     * also update state if value is present.
     * In case of object state update, data is merged with previous value
     * @param update
     */
    render: (update?: State) => void | Promise<void>

}

/**
 * Function that watch on the component lifecycle
 */
declare type Callback = (component: Component) => void | Promise<void>

/**
 * Declares how a component should be created
 */
declare type Definition = {
    namespace: string,
    selector: Selector,
    state: State,
    template: Template,
    onMount: Callback,
    onRender: Callback,
    onDestroy: Callback
}

/**
 * Extends HTMLElement to allow storing of components
 */
declare interface HTMLElementWithComponents extends HTMLElement {
    __components?: Record<string, Component>
}

/**
 * Registered definitions
 */
const _definitions: Array<Definition> = []

/**
 * Solves a value, being a function promise or not, and return the final value
 * @param value
 * @param data
 * @returns
 */
async function solveResult(value: any, data?: any) {
    try {
        if (typeof value === 'function') {
            return await value.apply({}, [data])
        }
        return value
    } catch (error) {
        return Promise.reject(error)
    }
}

/**
 * Solves the selector to final array
 * @param selector
 * @returns
 */
async function solveSelector(selector: Selector) {
    const solved = await solveResult(selector)
    const selectors = !Array.isArray(solved) ? [solved] : solved
    return selectors
}

/**
 * Register a new component definition
 * @param selector
 * @param definition
 */
async function register(selector: Selector, definition: {
    selector?: Selector,
    namespace?: string,
    state?: State,
    template?: Template,
    onMount?: Callback,
    onRender?: Callback,
    onDestroy?: Callback
}) {

    if (!definition.selector) {
        definition.selector = selector
    }
    if (!definition.namespace) {
        definition.namespace = Math.random().toString(16).substring(2, 10)
    }
    if (typeof definition.onMount !== 'function') {
        definition.onMount = () => { }
    }
    if (typeof definition.onRender !== 'function') {
        definition.onRender = () => { }
    }
    if (typeof definition.onDestroy !== 'function') {
        definition.onDestroy = () => { }
    }

    _definitions.push(definition as Definition)

}

/**
 * Remove the registered component definition.
 * This method will not destroy current instances of the matching selector.
 * You must destroys the current live components first if there are any.
 * Tip: you can do it using the ${selector} as resolve function
 * @param selector
 */
async function unregister(selector: Selector) {

    const solved = await solveSelector(selector)

    for (let i = 0; i < _definitions.length; i++) {
        const definition = _definitions[i]
        const definitionSolved = await solveSelector(definition.selector)
        const match = definitionSolved.some((item) => solved.indexOf(item) !== -1)

        if (match) {
            delete _definitions[i]
        }
    }

}

/**
 * Render the component by updating its final HTML.
 * Also destroys and mounts child elements if necessary.
 * You must provide the final parsed template with the replaced state.
 * Tip: Use the component template as function when need to replace state
 * @param component
 * @param callback
 */
async function render(component: Component, callback: Callback) {

    // Fetch live template
    const result = await solveResult(component.template, component)
    const current = component.element.innerHTML

    // If has no valid result, no need to continue
    if (typeof result !== 'string') {
        return
    }

    // If has no real change, then just run render callback
    if (result === current) {
        await callback(component)
        return
    }

    // Destroy existing child elements
    await destroy(component.element)

    // Mount new HTML result
    component.element.innerHTML = result

    // Render callback
    await callback(component)

    // Mount child elements
    // No need to await, should get its own process
    mount(component.element)

}

/**
 * Check if data is an object, excluding arrays
 * @param data
 * @returns
 */
function isObject(data: any) {
    return data !== null && typeof data === 'object' && Array.isArray(data) === false;
}

/**
 * Mount components on given target element
 * @param target
 */
async function mount(target: HTMLElement | Document) {

    for (const definition of _definitions) {

        const selector = await solveSelector(definition.selector)
        const found = $$(selector.join(', '), target) as Array<HTMLElementWithComponents>

        const namespace = definition.namespace
        const onMount = definition.onMount
        const onRender = definition.onRender

        for (const element of found) {

            if (element.__components === undefined) {
                element.__components = {}
            }

            // Already mounted
            if (element.__components[namespace] !== undefined) {
                continue
            }

            // Attach placeholder while mounting
            element.__components[namespace] = null

            // Solve the state result
            // State as function avoid pointer reference on objects
            const state = await solveResult(definition.state)

            // Make template be valid
            // Also fallback to the element HTML if not defined
            const template = definition.template !== undefined
                ? definition.template : async () => { return element.innerHTML }

            // Prevent render and mount infinity loop
            let isMounting = true

            const component: Component = {
                element: element,
                state: state,
                template: template,
                render: async (update?: State) => {
                    if (update !== undefined) {
                        if (isObject(component.state) && isObject(update)) {
                            component.state = {
                                ...component.state,
                                ...update
                            }
                        } else {
                            component.state = update
                        }
                    }
                    if (!isMounting) {
                        await render(component, onRender)
                    }
                }
            }

            element.__components[namespace] = component

            await onMount(component)
            isMounting = false
            await render(component, onRender)

        }

    }

}

/**
 * Destroy components on given target element
 * @param target
 */
async function destroy(target: HTMLElement | Document) {

    for (const definition of _definitions) {

        const selector = await solveSelector(definition.selector)
        const found = $$(selector.join(', '), target) as Array<HTMLElementWithComponents>

        const namespace = definition.namespace
        const onDestroy = definition.onDestroy

        for (const element of found) {

            // Component not mounted yet
            if (element.__components === undefined) {
                continue
            }
            if (element.__components[namespace] === undefined) {
                continue
            }

            // Destroy the component instance
            const component = element.__components[namespace]
            await onDestroy(component)
            delete element.__components[namespace]

        }

    }

}

export type { Selector, Template, State, Component, Callback }
export { register, unregister, render, mount, destroy }
