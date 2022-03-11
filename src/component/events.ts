import { extendComponent } from './component'
import { on, off, trigger } from '../core/events'
import { beforeDestroy } from './destroy'

extendComponent({

    /**
     * Attach event on component
     * @param event
     * @param selector
     * @param callback
     */
    on: function (event: string, selector: string | Function, callback?: Function): Function {

        if (callback === undefined) {
            callback = selector as Function
            selector = ''
        }

        const element = this.element
        const eventID = [event, this.namespace, element.dataset.vid].join('.')

        return on(element, eventID, selector, callback)
    },

    /**
     * Remove event on component
     * @param event
     * @param selector
     */
    off: function (event?: string, selector?: string): Function {

        const element = this.element
        const eventID = [event, this.namespace, element.dataset.vid].join('.')

        return off(element, eventID, selector)
    },

    /**
     * Trigger event on component
     * @param event
     * @param selector
     */
    trigger: function (event: string, selector?: any): void {

        const element = this.element
        const eventID = [event, this.namespace, element.dataset.vid].join('.')

        return trigger(element, eventID, selector)
    }

})

// API
beforeDestroy(async function () {
    return this.off()
})