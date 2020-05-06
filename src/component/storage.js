(function (V) {

    // PUBLIC

    V.extend(V._abstractComponent, {

        /**
         * Set element data
         * @public
         * @name V.component.set
         * @kind function
         * @param {String} key
         * @param {mixed} value
         * @return {Object}
         */
        set: function (key, value) {

            this
                .element
                ._components[this.namespace][key] = value;

            return this;
        },

        /**
         * Get element data
         * @public
         * @name V.component.get
         * @kind function
         * @param {String} key
         * @param {mixed} defaultValue
         * @return {mixed}
         */
        get: function (key, defaultValue) {

            var value = this
                .element
                ._components[this.namespace][key];

            if (value === undefined) {
                return defaultValue;
            }

            return value;
        }

    });

})(window.V);