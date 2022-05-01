import { $$ } from './selector'

declare interface Trigger {
    event: string
    namespace: string,
    callback: Function
}

declare interface WithEvents extends EventTarget {
    __events?: Array<Trigger>
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
    selector?: string | Function,
    callback?: Function
) {

    const events = event.split(' ')

    // Multi events
    if (events.length > 1) {
        for (const theEvent of events) {
            _event(action, element, theEvent, selector, callback)
        }
        return
    }

    let handler: Function

    // Determine handler
    if (callback === undefined && selector === undefined) {

        // None
        handler = null
        selector = null

    } else if (callback === undefined) {

        // Bind
        handler = selector as Function
        selector = null

    } else {

        // Delegated
        handler = (event: Event) => {
            const target = (event.target as HTMLElement).closest(selector as string)
            if (target) {
                callback.apply(target, [event])
            }
        }

    }

    const split = event.split('.')
    const theEvent = split.shift()
    const namespace = split.join('.')
    const items: Array<WithEvents> = element instanceof Window ? [element] : $$(element)

    if (action === 'add' && typeof handler === 'function') {

        for (const item of items) {

            if (item.__events === undefined) {
                item.__events = []
            }

            item.__events.push({
                event: theEvent,
                namespace: namespace,
                callback: handler
            })

            item.addEventListener(
                theEvent,
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
                    theEvent !== watcher.event
                    && (namespace === '' || namespace !== watcher.namespace)
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
function on(element: any, event: string, selector: string | Function, callback?: Function) {
    return _event('add', element, event, selector, callback)
}

/**
 * Remove event from element
 * @param element
 * @param event
 * @param selector
 * @param callback
 */
function off(element: any, event: string, selector?: string | Function, callback?: Function) {
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

export type { Trigger }
export { on, off, trigger }