import { fakePromise, promises } from '../core/promise'
import { extendComponent } from './component'
import { mount, afterMount } from './mount'
import { template } from '../core/template'
import { hook } from '../core/utils'
import type { Component } from './component'
import { destroy } from './destroy'

export interface RenderableComponent extends Component {
    template: Function
    renderTemplate: Function
    shouldRender: Function
    beforeRender: Function
    onRender: Function
    afterRender: Function
}

extendComponent({

    /**
     * Component template
     */
    template: fakePromise,

    /**
     * Component render template
     */
    renderTemplate: async function () {

        const current = this.element.innerHTML;
        const theTemplate = await this.template()

        if (theTemplate === undefined || theTemplate === null || theTemplate === false) {
            return
        }

        const variables = this.get()
        const result = template(
            String(theTemplate),
            variables
        )

        if( result != current ){

            // Destroy existing child elements
            await destroy(this.element)

            // Mount new template
            this.element.innerHTML = result

        }

    },

    /**
     * Component should render
     */
    shouldRender: async function () {
        return true
    },

    /**
     * Component before render
     */
    beforeRender: fakePromise,

    /**
     * Component on render
     */
    onRender: fakePromise,

    /**
     * Component after render
     */
    afterRender: fakePromise,

    /**
     * Component render
     * @param state
     */
    render: async function (state?: Object) {

        if (state !== undefined) {
            this.set(state)
        }

        const component = this as RenderableComponent
        const pass = await component.shouldRender()

        if (!pass) {
            return
        }

        try {

            const callbacks = [].concat(
                hook('componentBeforeRender'),
                [component.beforeRender],
                [component.renderTemplate],
                [component.onRender],
                [component.afterRender],
                hook('componentAfterRender')
            )

            await promises(component, callbacks)

            // Mount child elements
            await mount(component.element)

        } catch (error) {
            console.warn('[V] Component render error:', error)
            //reject(error)
        }

    }

})

/**
 * Add global callback before component render
 * @param callback
 */
export function beforeRender(callback: Function) {
    hook('componentBeforeRender', callback)
}

/**
 * Add global callback after component render
 * @param callback
 */
export function afterRender(callback: Function) {
    hook('componentAfterRender', callback)
}

// API
afterMount(async function () {
    return this.render()
})
