import {extendComponent} from './component'
import {on, off, trigger} from '../core/events'

extendComponent({

    /**
     * Attach event on component
     * @param event
     * @param selector
     * @param callback
     */
    on: function (event: string, selector: string|Function, callback?: Function) {

        var self = this
        var element = self.element

        if (callback === undefined) {
            callback = selector as Function
            selector = self.selector
        } else {
            selector = self.selector + ' ' + selector
        }

        var eventId = event + '-' + selector
        var vid = element.dataset.vid
            vid = '[data-vid="' + vid + '"]'

        var fn = function (e: Event) {

            var element = (e.target as HTMLElement).closest(vid)

            if (!element) {
                return
            }

            callback.apply((e.target as HTMLElement).closest(selector as string), [e])

        }

        element._events[eventId] = on(
            document, event, selector, fn
        )

    },

    /**
     * Remove event on component
     * @param event
     * @param selector
     */
    off: function (event: string, selector?: string) {

        var self = this
        var element = self.element

        if (selector) {
            selector = self.selector + ' ' + selector
        } else {
            selector = self.selector
        }

        var eventId = event + '-' + selector
        var fn = element._events[eventId]

        if (!fn) {
            return
        }

        delete element._events[eventId]
        off(document, event, selector, fn)

    },

    /**
     * Trigger event on component
     * @param event
     * @param selector
     */
    trigger: function(event: string, selector?: any) {

        var self = this

        if (selector) {
            selector = self.selector + ' ' + selector
        } else {
            selector = self.selector
        }

        trigger(selector, event)

    }

})