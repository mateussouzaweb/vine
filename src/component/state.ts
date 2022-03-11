import { extendComponent } from './component'

extendComponent({

    /**
     * Set element data
     * @param key
     * @param value
     */
    set: function (key: string | Object, value?: any) {

        const element = this.element

        if (typeof key === 'string') {
            element._state[key] = value
        } else {
            element._state = Object.assign(element._state, key)
        }

    },

    /**
     * Get element data
     * @public
     * @param key
     * @param _default
     */
    get: function (key: string, _default?: any): any {

        const element = this.element

        if (key === undefined) {
            return element._state
        }

        let value = element._state[key]
        value = (value === undefined) ? _default : value

        return value
    },

    /**
     * Clone element data
     * @public
     * @param key
     * @param _default
     */
    clone: function (key: string, _default?: any): any {

        const result = this.get(key, _default)

        if (result instanceof Object) {
            return Object.assign({}, result)
        }

        return result
    }

})