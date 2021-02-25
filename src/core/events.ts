import { $$$ } from './selector'
import { NamespaceEvent, namespaceEvent } from './utils'

var _events = []

/**
 * Attach event to element
 * @param action
 * @param element
 * @param event
 * @param selector
 * @param callback
 */
function _event(action: "add" | "remove", element: any, event: string, selector: string | Function, callback?: Function): Function {

    var events = event.split(' ')

    // Multi events
    if( events.length > 1 ){
        for (var i = 0; i < events.length; i++) {
            _event(action, element, events[i], selector, callback)
        }
        return
    }

    var items = $$$(element)
    var handler: Function

    // Determine handler
    if (callback === undefined) {

        // Bind
        handler = <Function>selector
        selector = null

    } else {

        // Delegated
        handler = function (_event: Event) {
            var target = (_event.target as HTMLElement).closest(<string>selector)
            if (target) {
                callback.apply(target, [_event])
            }
        }

    }

    var theEvent = namespaceEvent(event, handler)

    if (action === 'add') {

        _events.push(theEvent)

        items.forEach(function (item) {
            item.addEventListener(
                theEvent.event,
                theEvent.callback.bind(item),
                false
            )
        })

    } else {

        _events = _events.filter(function (watcher: NamespaceEvent) {

            var pass = Boolean(
                (theEvent.event ? theEvent.event !== watcher.event : true)
                && (theEvent.namespace ? theEvent.namespace !== watcher.namespace : true)
                && (typeof handler === 'function' ? handler !== watcher.callback : true)
            )

            if( !pass ){
                items.forEach(function (item) {
                    item.removeEventListener(
                        watcher.event,
                        watcher.callback.bind(item),
                        false
                    )
                })
            }

            return pass
        })

    }

    return handler
}

/**
 * Add event to element
 * @param element
 * @param event
 * @param selector
 * @param callback
 */
export function on(element: any, event: string, selector: string | Function, callback?: Function): Function {
    return _event('add', element, event, selector, callback)
}

/**
 * Remove event from element
 * @param element
 * @param event
 * @param selector
 * @param callback
 */
export function off(element: any, event: string, selector: string | Function, callback?: Function): Function {
    return _event('remove', element, event, selector, callback)
}

/**
 * Trigger event on element
 * @param element
 * @param event
 * @param selector
 */
export function trigger(element: any, event: string, selector?: string): void {

    var items = (selector) ? $$$(selector, element) : $$$(element)
    var theEvent = document.createEvent('HTMLEvents')

    theEvent.initEvent(event, true, true)

    items.forEach(function (item) {
        item.dispatchEvent(theEvent)
    })

}