type ArrayOrObject = Array<any> | Object
type EachCallback = (value: any, index: number | string, data: ArrayOrObject) => void

var _hooks = [];

/**
 * Add hook or retrieve hooks for event
 * @param event
 * @param callback
 */
export function hook(event: string, callback?: Function) {

    if (callback === undefined) {
        return (_hooks[event]) ? _hooks[event] : []
    }

    _hooks[event] = _hooks[event] || []
    _hooks[event].push(callback)

}

/**
 * Run loop on items
 * @param items
 * @param callback
 */
export function each(items: ArrayOrObject, callback: EachCallback) {

    if (Array.isArray(items)) {
        return items.forEach(callback)
    }

    const keys = Object.keys(items)
    for (const key of keys) {
        callback(items[key], key, items)
    }

}