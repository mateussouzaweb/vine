declare interface Watcher {
    event: string
    callback: Function
}

let _watches: Array<Watcher> = []

/**
 * Add watch to a event
 * @param event
 * @param callback
 */
export function watch(event: string, callback: Function) {
    _watches.push({ event: event, callback: callback })
}

/**
 * Unwatch a event
 * @param event
 * @param callback
 */
export function unwatch(event: string, callback?: Function) {
    _watches = _watches.filter((watcher) => {
        return event !== watcher.event
            && (callback === undefined || callback !== watcher.callback)
    })
}

/**
 * Fire event data
 * @param event
 * @param data
 */
export async function fire(event: string, data?: any) {
    for (const watcher of _watches) {
        if (event === watcher.event) {
            await watcher.callback.apply({}, [data])
        }
    }
}