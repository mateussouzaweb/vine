declare interface Watcher {
    event: string,
    namespace: string,
    callback: Function
}

let _watches: Array<Watcher> = []

/**
 * Add or remove and event observer
 * @param action
 * @param event
 * @param callback
 */
function _watch(action: 'add' | 'remove', event: string, callback?: Function) {

    const parts = event.split('.')
    const theEvent = parts.shift()
    const namespace = parts.join('.')

    if (action === 'add') {

        _watches.push({
            event: theEvent,
            namespace: namespace,
            callback: callback
        })

    } else if (action === 'remove') {

        _watches = _watches.filter((watcher) => {
            return theEvent !== watcher.event
                && (namespace === '' || namespace !== watcher.namespace)
                && (callback === undefined || callback !== watcher.callback)
        })

    }

}

/**
 * Add watch to a event
 * @param event
 * @param callback
 */
function watch(event: string, callback: Function) {
    _watch('add', event, callback)
}

/**
 * Unwatch a event
 * @param event
 * @param callback
 */
function unwatch(event: string, callback?: Function) {
    _watch('remove', event, callback)
}

/**
 * Fire event data
 * @param event
 * @param data
 */
async function fire(event: string, data?: any) {
    for (const watcher of _watches) {
        if (event === watcher.event) {
            try {
                await watcher.callback.apply({}, [data])
            } catch (error) {
                return Promise.reject(error)
            }
        }
    }
}

export type { Watcher }
export { watch, unwatch, fire }