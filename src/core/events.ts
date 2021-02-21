import { $$$ } from './selector'

/**
 * Attach event to element
 * @param action
 * @param element
 * @param event
 * @param selector
 * @param callback
 */
function _event(action: "add" | "remove", element: any, event: string, selector: string | Function, callback?: Function): Function {

    var items = $$$(element)
    var events = event.split(' ')
    var handler: Function

    // Determine handler
    if (callback === undefined) {

        // Bind
        handler = <Function>selector
        selector = null

    } else {

        // Delegated
        handler = function (e: Event) {
            var target = (e.target as HTMLElement).closest(<string>selector)
            if (target) {
                callback.apply(target, [e])
            }
        }

    }

    items.forEach(function (item) {
        for (var i = 0; i < events.length; i++) {

            if (action === 'add') {
                item.addEventListener(
                    events[i],
                    handler.bind(item),
                    false
                )
            } else {
                item.removeEventListener(
                    events[i],
                    handler.bind(item),
                    false
                )
            }

        }
    })

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
 */
export function trigger(element: any, event: string) {

    var items = $$$(element)
    var theEvent = document.createEvent('HTMLEvents')

    theEvent.initEvent(event, true, true)

    items.forEach(function (item) {
        item.dispatchEvent(theEvent)
    })

}