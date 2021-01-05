/**
 * Set item on storage
 * @param storage
 * @param name
 * @param value
 */
export function _set(storage: Storage, name: string, value: string|Object) {

    if (value instanceof Object) {
        value = JSON.stringify(value)
    }

    storage.setItem(name, value as string)
}

/**
 * Retrieve item of storage
 * @param storage
 * @param name
 * @param parse
 */
export function _get(storage: Storage, name: string, parse?: Boolean): string|Object {

    var value = storage.getItem(name)

    if (parse == true && value) {
        value = JSON.parse(value)
    }

    return value
}

/**
 * Remove item on storage
 * @param storage
 * @param name
 */
export function _remove(storage: Storage, name: string) {
    storage.removeItem(name)
}