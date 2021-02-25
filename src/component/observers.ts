import { fire, unwatch, watch } from '../core/observers'
import { extendComponent } from './component'
import { beforeDestroy } from './destroy'

extendComponent({

    /**
     * Add watch to a event on component
     * @param event
     * @param callback
     */
    watch: function (event: string, callback: Function): void {
        var eventID = [event, this.namespace, this.element.dataset.vid].join('.')
        return watch(eventID, callback)
    },

    /**
     * Unwatch a event on component
     * @param event
     * @param callback
     */
    unwatch: function (event?: string, callback?: Function): void {
        var eventID = [event, this.namespace, this.element.dataset.vid].join('.')
        return unwatch(eventID, callback)
    },

    /**
     * Fire event on component
     * @param event
     * @param data
     */
    fire: function (event: string, data: any): Promise<any> {
        var eventID = [event, this.namespace, this.element.dataset.vid].join('.')
        return fire(eventID, data)
    }

})

// API
beforeDestroy(async function () {
    return this.unwatch()
})