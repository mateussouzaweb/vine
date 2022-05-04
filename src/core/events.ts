import { $$ } from './selector'

/**
 * Event callback contains the event details and the additional target argument.
 * Target resolves to the HTMLElement desired on delegated events.
 * In non-delegated events, target is just an alias to the event.target
 */
declare type EventCallback = (event: Event, target?: HTMLElement) => any

/**
 * Stores data about the event trigger defined by the user
 * This data can be used later to remove event listeners
 */
declare interface EventTrigger {
    event: string
    callback: EventCallback
}

/**
 * Extends EventTarget to allow storing of EventTrigger
 */
declare interface ElementWithEvents extends EventTarget {
    __events?: Array<EventTrigger>
}

/**
 * Attach or detach event on element
 * @param action
 * @param element
 * @param event
 * @param selector
 * @param callback
 */
function _event(
    action: 'add' | 'remove',
    element: any,
    event: string,
    selector?: string | EventCallback,
    callback?: EventCallback
) {

    const events = event.split(' ')

    // Multi events
    if (events.length > 1) {
        for (const theEvent of events) {
            _event(action, element, theEvent, selector, callback)
        }
        return
    }

    let handler: EventCallback

    // Determine handler
    if (callback === undefined && selector === undefined) {

        // None
        handler = null
        selector = null

    } else if (callback === undefined) {

        // Bind
        handler = (event: Event) => {
            (selector as EventCallback).apply(event.target, [event, event.target])
        }

    } else {

        // Delegated
        handler = (event: Event) => {
            const target = (event.target as HTMLElement).closest(selector as string)
            if (target) {
                callback.apply(target, [event, target])
            }
        }

    }

    const items: Array<ElementWithEvents> = element instanceof Window ? [element] : $$(element)

    if (action === 'add' && typeof handler === 'function') {

        for (const item of items) {

            if (item.__events === undefined) {
                item.__events = []
            }

            item.__events.push({
                event: event,
                callback: handler
            })

            item.addEventListener(
                event,
                handler.bind(item),
                false
            )

        }

    } else if (action === 'remove') {

        for (const item of items) {

            if (item.__events === undefined) {
                continue
            }

            item.__events = item.__events.filter((watcher) => {
                const pass = Boolean(
                    event !== watcher.event
                    && (typeof handler !== 'function' || handler !== watcher.callback)
                )

                if (!pass) {
                    item.removeEventListener(
                        watcher.event,
                        watcher.callback.bind(item),
                        false
                    )
                }

                return pass
            })

        }

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
function on(element: any, event: string, selector: string | EventCallback, callback?: EventCallback) {
    return _event('add', element, event, selector, callback)
}

/**
 * Remove event from element
 * @param element
 * @param event
 * @param selector
 * @param callback
 */
function off(element: any, event: string, selector?: string | EventCallback, callback?: EventCallback) {
    return _event('remove', element, event, selector, callback)
}

/**
 * Trigger event on element
 * @param element
 * @param event
 * @param selector
 */
function trigger(element: any, event: string, selector?: string) {

    const items = (selector !== undefined)
        ? $$(selector, element)
        : (element instanceof Window) ? [element] : $$(element)

    const theEvent = new Event(event, {
        'bubbles': true,
        'cancelable': true
    })

    for (const item of items) {
        item.dispatchEvent(theEvent)
    }

}

export type { EventTrigger, EventCallback }
export { on, off, trigger }