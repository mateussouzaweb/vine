import { $$ } from './selector'

/**
 * Event callback contains the event details and the additional target argument.
 * Target resolves to the HTMLElement desired on delegated events.
 * In non-delegated events, target is just an alias to the event.target
 */
declare type EventCallback = (event: Event, target: HTMLElement) => any

/**
 * Stores data about the event trigger defined by the user
 * This data can be used later to remove event listeners
 */
declare interface EventTrigger {
    event: string
    callback: EventListener
}

/**
 * Extends EventTarget to allow storing of event triggers
 */
declare interface ElementWithEvents extends EventTarget {
    __events?: Array<EventTrigger>
}

/**
 * Add event to element
 * @param element
 * @param event
 * @param selector
 * @param callback
 */
function on(element: any, event: string, selector: string | EventCallback, callback?: EventCallback) {

    const items: Array<ElementWithEvents> = element instanceof Window ? [element] : $$(element)
    const events = event.split(' ')

    let handler: EventListener
    if (typeof selector === 'function') {

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

    for (const item of items) {

        if (item.__events === undefined) {
            item.__events = []
        }

        for (const _event of events) {

            item.__events.push({
                event: _event,
                callback: handler
            })

            item.addEventListener(
                _event,
                handler,
                false
            )

        }

    }

    return handler
}

/**
 * Remove event from element
 * @param element
 * @param event
 * @param selector
 * @param callback
 */
function off(element: any, event: string, selector?: string | EventCallback, callback?: EventCallback) {

    const items: Array<ElementWithEvents> = element instanceof Window ? [element] : $$(element)
    const events = event.split(' ')
    const handler = (typeof selector === 'function') ? selector : callback

    for (const item of items) {

        if (item.__events === undefined) {
            continue
        }

        item.__events = item.__events.filter((watcher) => {
            const pass = Boolean(
                !events.includes(watcher.event)
                && (typeof handler !== 'function' || handler !== watcher.callback)
            )

            if (!pass) {
                item.removeEventListener(
                    watcher.event,
                    watcher.callback,
                    false
                )
            }

            return pass
        })

    }

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
