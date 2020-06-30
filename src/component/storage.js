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

            var element = this.element;

            if (element._storage === undefined) {
                element._storage = {};
            }

            element._storage[key] = value;

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

            var element = this.element;

            if (element._storage === undefined) {
                element._storage = {};
            }

            var value = element._storage[key];

            if (value === undefined) {
                return defaultValue;
            }

            return value;
        }

    });

})(window.V);