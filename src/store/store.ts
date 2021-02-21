var _store = {}

/**
 * Compress value
 * @param value
 */
function _compress(value: any): any {

    if (value instanceof Object) {
        value = JSON.stringify(value)
    }

    return value
}

/**
 * Decompress value
 * @param value
 */
function _decompress(value: any): any {
    try {
        var json = JSON.parse(value); value = json
    } catch (error) {
    }
    return value
}

/**
 * Set item on memoryStorage
 * @param name
 * @param value
 */
export function set(name: string, value: any) {
    _store[name] = value
}

/**
 * Retrieve item of memoryStorage
 * @param name
 * @param _default
 */
export function get(name: string, _default: any): any {

    var value = _store[name]
        value = (value === undefined) ? local.get(name) : value
        value = (value === undefined) ? _default : value

    return value
}

/**
 * Remove item of memoryStorage
 * @param name
 */
export function remove(name: string): void {
    delete _store[name]
}

/**
 * Retrieve all items at memoryStorage
 */
export function items(): Object {
    return _store
}

// LOCAL STORAGE
export const local = {

    /**
     * Set item on localStorage
     * @param name
     * @param value
     */
    set: function(name: string, value: string|Object): void {
        localStorage.setItem(name, _compress(value))
    },

    /**
     * Retrieve item of localStorage
     * @param name
     * @param _default
     */
    get: function(name: string, _default?: any): string|Object {

        var value = localStorage.getItem(name)
            value = _decompress(value)
            value = (value === undefined) ? _default : value

        return value
    },

    /**
     * Remove item of localStorage
     * @param name
     */
    remove: function(name: string): void {
        localStorage.removeItem(name)
    },

    /**
     * Retrieve all items at localStorage
     */
    items: function(): Object {
        return localStorage
    }

}

// SESSION STORAGE
export const session = {

    /**
     * Set item on sessionStorage
     * @param name
     * @param value
     */
    set: function(name: string, value: string|Object): void {
        sessionStorage.setItem(name, _compress(value))
    },

    /**
     * Retrieve item of sessionStorage
     * @param name
     * @param _default
     */
    get: function(name: string, _default?: any): string|Object {

        var value = sessionStorage.getItem(name)
            value = _decompress(value)
            value = (value === undefined) ? _default : value

        return value
    },

    /**
     * Remove item of sessionStorage
     * @param name
     */
    remove: function(name: string): void {
        sessionStorage.removeItem(name)
    },

    /**
     * Retrieve all items at sessionStorage
     */
    items: function(): Object {
        return sessionStorage
    }

}