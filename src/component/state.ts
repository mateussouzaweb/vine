import {extendComponent} from './component'

extendComponent({

    /**
     * Set element data and render component
     * @param key
     * @param value
     */
    update: function (key?: string|Object, value?: any) {

        if( key ){
            this.set(key, value)
        }

        return this.render()
    },

    /**
     * Set element data
     * @param key
     * @param value
     */
    set: function (key: string|Object, value?: any) {

        var element = this.element

        if( typeof key == 'string' ){
            element._state[key] = value
        }else{
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

        var element = this.element

        if (key === undefined) {
            return element._state
        }

        var value = element._state[key]
            value = (value === undefined) ? _default : value

        return value
    }

})