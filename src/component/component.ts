import {fakePromise, promises} from '../core/promise'
import {$$$} from '../core/selector'

export interface ComponentElement extends HTMLElement {
    _components: Object
    _events: Object
    _state: Object
}

export interface Component {
    element?: ComponentElement
    selector?: string
    namespace?: string
    constructor: Function
    destructor: Function
}

type ComponentCallback = (element: ComponentElement, definition: Component) => void

var _components = []
var _abstractComponent = {

    /**
     * Component DOM element
     */
    element: null,

    /**
     * Component DOM selector
     */
    selector: null,

    /**
     * Component namespace
     */
    namespace: null,

    /**
     * Component constructor
     */
    constructor: fakePromise,

    /**
     * Component destructor
     */
    destructor: fakePromise,

}

/**
 * Extend component declaration
 * @param definition
 */
export function extendComponent(definition: Object){
    Object.assign(_abstractComponent, definition)
}

/**
 * Loop through all registered components
 */
export function eachComponent(target: HTMLElement|HTMLDocument, callback: ComponentCallback) {
    _components.forEach(function (declaration) {
        var items = $$$(declaration.selector, target) as ComponentElement[]
        items.forEach(function (element) {

            if (element._components === undefined) {
                element._components = {}
            }
            if (element._state === undefined) {
                element._state = {}
            }
            if (element._events === undefined) {
                element._events = {}
            }

            callback.apply(element, [element, declaration])

        })
    })
}

/**
 * Create new component
 * @param selector
 * @param data
 */
export async function component(selector: string, data: Object): Promise<Component> {

    var component = Object.assign(
        {},
        _abstractComponent,
        data
    )

    component.selector = selector

    if( !component.namespace ){
        component.namespace = selector.replace(/[\W_]+/g, '_')
    }

    try {

        var callbacks = [].concat(
            [component.constructor]
        )

        await promises(component, callbacks)
        _components.push(component)

    } catch (error) {
        console.warn('[V] Component construct error:', error)
    }

    return component
}

/**
 * Remove component
 * @param selector
 */
export async function removeComponent(selector: string) {

    var component = null
    var index = null

    _components.forEach(function (theComponent, theIndex) {
        if (theComponent.selector == selector) {
            component = theComponent
            index = theIndex
        }
    })

    if (!component) {
        return
    }

    try {

        var callbacks = [].concat(
            [component.destructor]
        )

        await promises(component, callbacks)
        delete _components[index]

    } catch (error) {
        console.warn('[V] Component destruct error:', error)
    }

}
