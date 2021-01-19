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
 */
export function _get(storage: Storage, name: string): string|Object {

    var value = storage.getItem(name)

    try {
        var json = JSON.parse(value); value = json
    } catch (error) {
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