import { promisify } from "./promise"
import { NamespaceEvent, namespaceEvent } from "./utils"

var _watches = []

/**
 * Add watch to a event
 * @param theEvent
 * @param callback
 */
export function watch(theEvent: string, callback: Function): void {
    _watches.push(namespaceEvent(theEvent, callback))
}

/**
 * Unwatch a event
 * @param theEvent
 * @param callback
 */
export function unwatch(theEvent: string, callback?: Function): void {

    var event = namespaceEvent(theEvent, callback)

    _watches = _watches.filter(function (watcher: NamespaceEvent) {
        return Boolean(
            (event.event ? event.event !== watcher.event : true)
            && (event.namespace ? event.namespace !== watcher.namespace : true)
            && (event.callback !== undefined ? event.callback !== watcher.callback : true)
        )
    })

}

/**
 * Fire event data
 * @param theEvent
 * @param data
 */
export function fire(theEvent: string, data?: any): Promise<any> {

    var event = namespaceEvent(theEvent)
    var promises = []

    _watches.forEach(function (watcher: NamespaceEvent) {
        if ((event.event ? event.event === watcher.event : true)
            && (event.namespace ? event.namespace === watcher.namespace : true)) {
            promises.push(promisify({}, watcher.callback, [data]))
        }
    })

    return Promise.all(promises)
}