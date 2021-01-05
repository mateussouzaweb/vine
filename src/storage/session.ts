import {_set, _get, _remove} from './methods'

/**
 * Set item on sessionStorage
 * @param name
 * @param value
 */
export function set(name: string, value: string|Object) {
    return _set(sessionStorage, name, value as string)
}

/**
 * Retrieve item of sessionStorage
 * @param name
 * @param parse
 */
export function get(name: string, parse?: Boolean): string|Object {
    return _get(sessionStorage, name, parse)
}

/**
 * Remove item of sessionStorage
 * @param name
 */
export function remove(name: string) {
    return _remove(sessionStorage, name)
}