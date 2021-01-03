/**
 * Set item on sessionStorage
 * @param name
 * @param value
 */
export function set(name: string, value: string|Object) {

    if (value instanceof Object) {
        value = JSON.stringify(value)
    }

    sessionStorage.setItem(name, value as string)
}

/**
 * Retrieve item of sessionStorage
 * @param name
 * @param parse
 */
export function get(name: string, parse?: Boolean): string|Object {

    var value = sessionStorage.getItem(name)

    if (parse == true && value) {
        value = JSON.parse(value)
    }

    return value
}