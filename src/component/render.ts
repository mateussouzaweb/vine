import {fakePromise, promises} from '../core/promise'
import {extendComponent} from './component'
import {mount, afterMount} from './mount'
import {template} from '../core/template'
import {hook} from '../core/utils'
import type {Component} from './component'
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
    renderTemplate: async function(){

        var _template = await this.template()

        if ( _template === undefined || _template === false ){
            return
        }

        var variables = this.get()
        var result = template(
            String(_template),
            variables
        )

        this.element.innerHTML = result;

    },

    /**
     * Component should render
     */
    shouldRender: async function(){
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
    render: async function(state?: Object){

        if( state !== undefined ){
            this.set(state)
        }

        var component = this as RenderableComponent
        var pass = await component.shouldRender()

        if( !pass ){
            return
        }

        try {

            // Destroy existing child elements
            await destroy(component.element)

            var callbacks = [].concat(
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
afterMount(async function(){
    return this.render()
})
