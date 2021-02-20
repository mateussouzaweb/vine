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
        var key = [event, this.namespace, this.element.dataset.vid].join('.')
        return watch(key, callback)
    },

    /**
     * Unwatch a event on component
     * @param event
     * @param callback
     */
    unwatch: function (event?: string, callback?: Function): void {
        var key = [String(event), this.namespace, this.element.dataset.vid].join('.')
        return unwatch(key, callback)
    },

    /**
     * Fire event on component
     * @param event
     * @param data
     */
    fire: function (event: string, data: any): Promise<any> {
        return fire(event, data)
    }

})

// API
beforeDestroy(async function () {
    return this.unwatch()
})