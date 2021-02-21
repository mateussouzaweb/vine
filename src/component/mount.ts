import { fakePromise, promises } from '../core/promise'
import { eachComponent, extendComponent } from './component'
import { hook } from '../core/utils'
import type { Component } from './component'

export interface MountableComponent extends Component {
    beforeMount: Function
    onMount: Function
    afterMount: Function
}

extendComponent({

    /**
     * Component before mount
     */
    beforeMount: fakePromise,

    /**
     * Component on mount
     */
    onMount: fakePromise,

    /**
     * Component after mount
     */
    afterMount: fakePromise,

})

/**
 * Add global callback before component mount
 * @param callback
 */
export function beforeMount(callback: Function) {
    hook('componentBeforeMount', callback)
}

/**
 * Add global callback after component mount
 * @param callback
 */
export function afterMount(callback: Function) {
    hook('componentAfterMount', callback)
}

/**
 * Mount components on given target child elements
 * @param target
 */
export async function mount(target: HTMLElement | HTMLDocument): Promise<HTMLElement | HTMLDocument> {

    var callbacks = []

    eachComponent(target, function (element, declaration) {

        var key = declaration.namespace

        // Already mounted
        if (element._components[key] !== undefined) {
            return
        }

        if (!element.dataset.vid) {
            element.dataset.vid = Math.random().toString(16).substr(2, 8)
        }

        // Clone component to this element
        var component = Object.assign({}, declaration) as MountableComponent
        component.element = element

        element._components[key] = component

        var componentCallbacks = [].concat(
            hook('componentBeforeMount'),
            [component.beforeMount],
            [component.onMount],
            [component.afterMount],
            hook('componentAfterMount')
        )

        callbacks.push(
            promises(component, componentCallbacks)
        )

    })

    await Promise.all(callbacks)

    return target
}