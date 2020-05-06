(function (V) {

    V.extend(V, {

        /**
         * Session storage lib
         * @name V.session
         */
        session: {

            /**
             * Set item on sessionStorage
             * @public
             * @name V.session.set
             * @kind function
             * @param {String} name
             * @param {Mixed} value
             * @return {Object}
             */
            set: function (name, value) {

                if (value instanceof Object) {
                    value = JSON.stringify(value);
                }

                return sessionStorage.setItem(name, value);
            },

            /**
             * Retrieve item of sessionStorage
             * @public
             * @name V.session.get
             * @kind function
             * @param {String} name
             * @param {Boolean} parse
             * @return {Mixed}
             */
            get: function (name, parse) {

                var value = sessionStorage.getItem(name);

                if (parse == true && value) {
                    value = JSON.parse(value);
                }

                return value;
            }

        }

    });

})(window.V);