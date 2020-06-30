(function () {

    /**
     * Vanilla UI core lib
     * @global
     * @name V
     */
    window.V = {

        /**
         * Run loop on items
         * @public
         * @name V.each
         * @kind function
         * @param {Array|Object} items
         * @param {Function} callback
         * @return {void}
         */
        each: function (items, callback) {

            if (Array.isArray(items)) {
                items.forEach(callback);
            } else {

                const keys = Object.keys(items);
                for (const key of keys) {
                    callback(items[key], key, items);
                }

            }

        },

        /**
         * Load an plugin on the library
         * @public
         * @name V.extend
         * @kind function
         * @param {Object} library
         * @param {Object} plugin
         * @return {void}
         */
        extend: function (library, plugin) {

            this.each(plugin, function (value, key) {

                if (library[key] !== undefined) {
                    console.warn('Warning, the method {key} is being overwrite be another plugin', key);
                }

                library[key] = value;

            });

        },

        /**
         * Promisify the callback
         * @public
         * @name V.promisify
         * @kind function
         * @param {Object} scope
         * @param {Function} callback
         * @return {Promise}
         */
        promisify: function (scope, callback) {
            return new Promise(function (resolve, reject) {
                try{
                    return callback.apply(scope, [resolve, reject]);
                }catch(error){
                    return reject(error);
                }
            });
        },

        /**
        * Fake promise instance
        * @public
        * @name V.fakePromise
        * @kind function
        * @param {Function} resolve
        * @return {void}
        */
        fakePromise: function (resolve) {
            resolve(this);
        },

        /**
         * Wait the resolution of various promisify callbacks
         * @param {Object} scope
         * @param {Array} callbacks
         * @return {Promise}
         */
        promises: async function (scope, callbacks) {

            const self = this;
            var promises = [];

            for (let index = 0; index < callbacks.length; index++) {
                if( typeof callbacks[index] === 'function' ){
                    promises.push(
                        self.promisify(scope, callbacks[index])
                    );
                }
            }

            await Promise.all(promises);

            return scope;
        }

    };

})();