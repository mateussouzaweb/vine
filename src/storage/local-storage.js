(function () {

    // LocalStorage lib
    V.extend({
        localStorage: {

            /**
             * Set item on localStorage
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