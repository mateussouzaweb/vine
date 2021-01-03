/**
 * Set item on localStorage
 * @param name
 * @param value
 */
export function set(name: string, value: string|Object) {

    if (value instanceof Object) {
        value = JSON.stringify(value)
    }

    localStorage.setItem(name, value as string)
}

/**
 * Retrieve item of localStorage
 * @param name
 * @param parse
 */
export function get(name: string, parse?: Boolean): string|Object {

    var value = localStorage.getItem(name)

    if (parse == true && value) {
        value = JSON.parse(value)
    }

    return value
}