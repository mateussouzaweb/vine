import { promisify } from "./promise"

var _watches = []

/**
 * Add watch to a event
 * @param theEvent
 * @param callback
 */
export function watch(theEvent: string, callback: Function): void {

    var split = theEvent.split('.')
    var event = split.shift()
    var namespace = split.join('.')

    _watches.push([event, namespace, callback])

}

/**
 * Unwatch a event
 * @param theEvent
 * @param callback
 */
export function unwatch(theEvent: string, callback?: Function): void {

    var split = theEvent.split('.')
    var event = split.shift()
    var namespace = split.join('.')

    _watches = _watches.filter(function (watcher: Function) {
        return Boolean(
            (event ? event !== watcher[0] : true)
            && (namespace ? namespace !== watcher[1] : true)
            && (callback !== undefined ? callback !== watcher[2] : true)
        )
    })

}

/**
 * Fire event data
 * @param theEvent
 * @param data
 */
export function fire(theEvent: string, data?: any): Promise<any> {

    var split = theEvent.split('.')
    var event = split.shift()
    var namespace = split.join('.')
    var promises = []

    _watches.forEach(function (watcher: Function) {
        if ((event ? event === watcher[0] : true)
            && (namespace ? namespace === watcher[1] : true)) {
            promises.push(promisify({}, watcher[2], [data]))
        }
    })

    return Promise.all(promises)
}