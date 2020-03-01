(function () {

    V.extend({

        /**
         * Local storage lib
         * @name V.localStorage
         */
        localStorage: {

            /**
             * Set item on localStorage
             * @public
             * @name V.localStorage.set
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
             * @name V.localStorage.get
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