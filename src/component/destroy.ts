import {fakePromise, promises} from '../core/promise'
import {eachComponent, extendComponent} from './component'
import {hook} from '../core/utils'
import type {Component} from './component'

export interface DestroyableComponent extends Component {
    beforeDestroy: Function
    onDestroy: Function
    afterDestroy: Function
}

extendComponent({

    /**
     * Component before destroy
     */
    beforeDestroy: fakePromise,

    /**
     * Component on destroy
     */
    onDestroy: fakePromise,

    /**
     * Component after destroy
     */
    afterDestroy: fakePromise,

})

/**
 * Add global callback before component destroy
 * @param callback
 */
export function beforeDestroy(callback: Function) {
    hook('componentBeforeDestroy', callback)
}

/**
 * Add global callback after component destroy
 * @param callback
 */
export function afterDestroy(callback: Function) {
    hook('componentAfterDestroy', callback)
}

/**
 * Destroy components on given target child elements
 * @param target
 */
export async function destroy(target: HTMLElement) {

    var callbacks = []

    eachComponent(target, function (element, declaration) {

        var key = declaration.namespace

        if (element._components[key] === undefined) {
            return
        }

        var component = element._components[key] as DestroyableComponent
        delete element._components[key]

        var componentCallbacks = [].concat(
            hook('componentBeforeDestroy'),
            [component.beforeDestroy],
            [component.onDestroy],
            [component.afterDestroy],
            hook('componentAfterDestroy')
        )

        callbacks.push(
            promises(component, componentCallbacks)
        )

    })

    await Promise.all(callbacks)

    return target
}