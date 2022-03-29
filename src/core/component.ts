import { $$ } from "./selector"

declare type SelectorType = string | Array<string>
declare type SelectorFunction = () => SelectorType | Promise<SelectorType>
declare type Selector = SelectorType | SelectorFunction

declare type TemplateFunction = (component: Component) => string | Promise<string>
declare type Template = string | TemplateFunction

declare type State = any

declare type Callback = (component: Component) => void | Promise<void>

declare type Component = {
    element: HTMLElement,
    state: State,
    template: Template,
    render: (state?: State) => void | Promise<void>
}

declare type Definition = {
    namespace: string,
    selector: Selector,
    state: State,
    template: Template,
    onMount: Callback,
    onRender: Callback,
    onDestroy: Callback
}

declare interface WithComponents extends HTMLElement {
    __components?: Record<string, Component>
}

/**
 * Store registered definitions
 */
const _definitions: Array<Definition> = []

/**
 * Solves a value, being a function promise or not and return the final value
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
 * You must destroy the current live components first if there is any.
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
 * Also destroy and mount child elements if necessary.
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

    if (result !== current) {

        // Destroy existing child elements
        await destroy(component.element)

        // Mount new HTML result
        component.element.innerHTML = result

    }

    // Render callback
    await callback(component)

    // Mount child elements
    await mount(component.element)

}

/**
 * Mount components on given target element
 * @param target
 */
async function mount(target: HTMLElement) {

    for (const definition of _definitions) {

        const selector = await solveSelector(definition.selector)
        const found = $$(selector.join(', '), target) as Array<WithComponents>

        const namespace = definition.namespace
        const onMount = definition.onMount
        const onRender = definition.onRender

        for (const element of found) {

            if (element.__components === undefined) {
                element.__components = {}
            }

            // Already mounted
            if (element.__components[namespace] !== undefined) {
                return
            }

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
                render: async (state?: State) => {
                    if (state !== undefined) {
                        component.state = state
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
async function destroy(target: HTMLElement) {

    for (const definition of _definitions) {

        const selector = await solveSelector(definition.selector)
        const found = $$(selector.join(', '), target) as Array<WithComponents>

        const namespace = definition.namespace
        const onDestroy = definition.onDestroy

        for (const element of found) {

            // Component not mounted yet
            if (element.__components === undefined) {
                return
            }
            if (element.__components[namespace] !== undefined) {
                return
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
