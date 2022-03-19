import { $$ } from './selector'

declare interface Trigger {
    event: string
    namespace: string,
    callback: Function
}

let _events: Array<Trigger> = []

/**
 * Attach event to element
 * @param action
 * @param element
 * @param event
 * @param selector
 * @param callback
 */
function _event(
    action: "add" | "remove",
    element: any,
    event: string,
    selector: string | Function,
    callback?: Function
) {

    const events = event.split(' ')

    // Multi events
    if (events.length > 1) {
        for (let i = 0; i < events.length; i++) {
            _event(action, element, events[i], selector, callback)
        }
        return
    }

    const items = element instanceof Window ? [element] : $$(element)
    let handler: Function

    // Determine handler
    if (callback === undefined) {

        // Bind
        handler = <Function>selector
        selector = null

    } else {

        // Delegated
        handler = (event: Event) => {
            const target = (event.target as HTMLElement).closest(<string>selector)
            if (target) {
                callback.apply(target, [event])
            }
        }

    }

    const split = event.split('.')
    const theEvent = split.shift()
    const namespace = split.join('.')

    if (action === 'add') {

        _events.push({
            event: theEvent,
            namespace: namespace,
            callback: handler
        })

        items.forEach((item: Node | Window) => {
            item.addEventListener(
                theEvent,
                handler.bind(item),
                false
            )
        })

        return handler;

    }

    _events = _events.filter((watcher) => {

        const pass = Boolean(
            theEvent !== watcher.event
            && (namespace === '' || namespace !== watcher.namespace)
            && (typeof handler !== 'function' || handler !== watcher.callback)
        )

        if (!pass) {
            items.forEach((item: Node | Window) => {
                item.removeEventListener(
                    watcher.event,
                    watcher.callback.bind(item),
                    false
                )
            })
        }

        return pass
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
export function on(element: any, event: string, selector: string | Function, callback?: Function) {
    return _event('add', element, event, selector, callback)
}

/**
 * Remove event from element
 * @param element
 * @param event
 * @param selector
 * @param callback
 */
export function off(element: any, event: string, selector: string | Function, callback?: Function) {
    return _event('remove', element, event, selector, callback)
}

/**
 * Trigger event on element
 * @param element
 * @param event
 * @param selector
 */
export function trigger(element: any, event: string, selector?: string) {

    const items = (selector !== undefined)
        ? $$(selector, element)
        : (element instanceof Window) ? [element] : $$(element)

    const theEvent = new Event(event, {
        'bubbles': true,
        'cancelable': true
    })

    items.forEach((item: Node | Window) => {
        item.dispatchEvent(theEvent)
    })

}