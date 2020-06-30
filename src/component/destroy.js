(function (V) {

    // PRIVATE

    /**
     * Global data
     * @private
     * @param {Object}
     */
    var _global = {
        beforeDestroyHooks: [],
        afterDestroyHooks: []
    };

    // PUBLIC

    V.extend(V._abstractComponent, {

        /**
         * Component before destroy
         * @public
         * @name V.component.beforeDestroy
         * @kind function
         * @param {Function} resolve
         * @param {Function} reject
         * @return {Promise}
         */
        beforeDestroy: V.fakePromise,

        /**
         * Component on destroy
         * @public
         * @name V.component.onDestroy
         * @kind function
         * @param {Function} resolve
         * @param {Function} reject
         * @return {Promise}
         */
        onDestroy: V.fakePromise,

        /**
         * Component after destroy
         * @public
         * @name V.component.afterDestroy
         * @kind function
         * @param {Function} resolve
         * @param {Function} reject
         * @return {Promise}
         */
        afterDestroy: V.fakePromise

    });

    V.extend(V, {

        /**
         * Add global callback before component destroy
         * @public
         * @name V.beforeDestroy
         * @kind function
         * @param {Function} callback
         * @return {void}
         */
        beforeDestroy: function (callback) {
            _global.beforeDestroyHooks.push(callback);
        },

        /**
         * Add global callback after component destroy
         * @public
         * @name V.afterDestroy
         * @kind function
         * @param {Function} callback
         * @return {void}
         */
        afterDestroy: function (callback) {
            _global.afterDestroyHooks.push(callback);
        },

        /**
         * Destroy components on given target child elements
         * @public
         * @name V.destroy
         * @kind function
         * @param {Node} target
         * @return {Promise}
         */
        destroy: async function (target) {

            var promises = [];

            V._components.forEach(function (_component) {
                V.items(_component.selector, target)
                .forEach(function (element) {

                    if (element._components === undefined) {
                        return;
                    }

                    var key = _component.namespace;

                    if (element._components[key] === undefined) {
                        return;
                    }

                    var component = element._components[key];
                    delete element._components[key];

                    var callbacks = [].concat(
                        _global.beforeDestroyHooks,
                        [component.beforeDestroy],
                        [component.onDestroy],
                        [component.afterDestroy],
                        _global.afterDestroyHooks
                    );

                    promises.push(
                        V.promises(component, callbacks)
                    );

                });
            });

            await Promise.all(promises);

            return target;
        }

    });

})(window.V);