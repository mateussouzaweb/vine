import {_set, _get, _remove} from './methods'

/**
 * Set item on localStorage
 * @param name
 * @param value
 */
export function set(name: string, value: string|Object) {
    return _set(localStorage, name, value as string)
}

/**
 * Retrieve item of localStorage
 * @param name
 * @param parse
 */
export function get(name: string, parse?: Boolean): string|Object {
    return _get(localStorage, name, parse)
}

/**
 * Remove item of localStorage
 * @param name
 */
export function remove(name: string) {
    return _remove(localStorage, name)
}