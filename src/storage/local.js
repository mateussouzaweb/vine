(function (V) {

    V.extend(V, {

        /**
         * Local storage lib
         * @name V.local
         */
        local: {

            /**
             * Set item on localStorage
             * @public
             * @name V.local.set
             * @kind function
             * @param {String} name
             * @param {Mixed} value
             * @return {Object}
             */
            set: function (name, value) {

                if (value instanceof Object) {
                    value = JSON.stringify(value);
                }

                return localStorage.setItem(name, value);
            },

            /**
             * Retrieve item of localStorage
             * @public
             * @name V.local.get
             * @kind function
             * @param {String} name
             * @param {Boolean} parse
             * @return {Mixed}
             */
            get: function (name, parse) {

                var value = localStorage.getItem(name);

                if (parse == true && value) {
                    value = JSON.parse(value);
                }

                return value;
            }

        }

    });

})(window.V);