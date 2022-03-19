let _store: Record<string, any> = {}

/**
 * Compress value
 * @param value
 * @returns
 */
function _compress(value: any) {

    if (value instanceof Object) {
        value = JSON.stringify(value)
    }

    return value
}

/**
 * Decompress value
 * @param value
 * @returns
 */
function _decompress(value: any) {
    try {
        const json = JSON.parse(value)
        value = json
    } catch (error) {
    }
    return value
}

// MEMORY STORAGE
export const memory = {

    /**
     * Set item
     * @param name
     * @param value
     */
    set: (name: string, value: any) => {
        _store[name] = value
    },

    /**
     * Retrieve item of localStorage
     * @param name
     * @param _default
     * @returns
     */
    get: (name: string, _default?: any): any => {

        let value = _store[name]
        value = (value === undefined || value === null) ? local.get(name) : value
        value = (value === undefined || value === null) ? _default : value

        return value
    },

    /**
     * Remove item
     * @param name
     */
    remove: (name: string) => {
        delete _store[name]
    },

    /**
     * Retrieve all items
     * @returns
     */
    items: (): Object => _store

}

// LOCAL STORAGE
export const local = {

    /**
     * Set item on localStorage
     * @param name
     * @param value
     */
    set: (name: string, value: any) => {
        localStorage.setItem(name, _compress(value))
    },

    /**
     * Retrieve item of localStorage
     * @param name
     * @param _default
     * @returns
     */
    get: (name: string, _default?: any) => {

        let _value = localStorage.getItem(name)
        let value = _decompress(_value)
        value = (value === undefined || value === null) ? _default : value

        return value
    },

    /**
     * Remove item of localStorage
     * @param name
     */
    remove: (name: string) => {
        localStorage.removeItem(name)
    },

    /**
     * Retrieve all items at localStorage
     * @returns
     */
    items: (): Object => localStorage

}

// SESSION STORAGE
export const session = {

    /**
     * Set item on sessionStorage
     * @param name
     * @param value
     */
    set: (name: string, value: any) => {
        sessionStorage.setItem(name, _compress(value))
    },

    /**
     * Retrieve item of sessionStorage
     * @param name
     * @param _default
     * @returns
     */
    get: (name: string, _default?: any) => {

        let _value = sessionStorage.getItem(name)
        let value = _decompress(_value)
        value = (value === undefined || value === null) ? _default : value

        return value
    },

    /**
     * Remove item of sessionStorage
     * @param name
     */
    remove: (name: string) => {
        sessionStorage.removeItem(name)
    },

    /**
     * Retrieve all items at sessionStorage
     * @returns
     */
    items: (): Object => sessionStorage

}