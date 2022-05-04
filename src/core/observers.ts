/**
 * Watcher represents a watcher that awaits for an observable event to run callback
 * It also has a context to identify itself
 */
declare interface Watcher {
    context: any,
    event: string,
    callback: Function
}

let _watchers: Array<Watcher> = []

/**
 * Add or remove an event watcher
 * @param action
 * @param context
 * @param event
 * @param callback
 */
function _watcher(action: 'add' | 'remove', context: any, event?: string, callback?: Function) {

    if (action === 'add') {

        _watchers.push({
            context: context,
            event: event,
            callback: callback
        })

    } else if (action === 'remove') {

        _watchers = _watchers.filter((watcher) => {
            return context !== watcher.context
                && (event === undefined || event !== watcher.event)
                && (callback === undefined || callback !== watcher.callback)
        })

    }

}

/**
 * Watch to a event with given context
 * @param context
 * @param event
 * @param callback
 */
function watch(context: any, event: string, callback: Function) {
    _watcher('add', context, event, callback)
}

/**
 * Unwatch to a event with given context
 * @param context
 * @param event
 * @param callback
 */
function unwatch(context: any, event?: string, callback?: Function) {
    _watcher('remove', context, event, callback)
}

/**
 * Fire observable event with data
 * @param event
 * @param data
 */
async function fire(event: string, data?: any) {
    for (const watcher of _watchers) {
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