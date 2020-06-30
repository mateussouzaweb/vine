(function (V) {

    // PRIVATE

    /**
     * Global data
     * @private
     * @param {Object}
     */
    var _global = {
        beforeMountHooks: [],
        afterMountHooks: []
    };

    // PUBLIC

    V.extend(V._abstractComponent, {

        /**
         * Component before mount
         * @public
         * @name V.component.beforeMount
         * @kind function
         * @param {Function} resolve
         * @param {Function} reject
         * @return {Promise}
         */
        beforeMount: V.fakePromise,

        /**
         * Component on mount
         * @public
         * @name V.component.onMount
         * @kind function
         * @param {Function} resolve
         * @param {Function} reject
         * @return {Promise}
         */
        onMount: V.fakePromise,

        /**
         * Component after mount
         * @public
         * @name V.component.afterMount
         * @kind function
         * @param {Function} resolve
         * @param {Function} reject
         * @return {Promise}
         */
        afterMount: V.fakePromise

    });

    V.extend(V, {

        /**
         * Add global callback before component mount
         * @public
         * @name V.beforeMount
         * @kind function
         * @param {Function} callback
         * @return {void}
         */
        beforeMount: function (callback) {
            _global.beforeMountHooks.push(callback);
        },

        /**
         * Add global callback after component mount
         * @public
         * @name V.afterMount
         * @kind function
         * @param {Function} callback
         * @return {void}
         */
        afterMount: function (callback) {
            _global.afterMountHooks.push(callback);
        },

        /**
         * Mount components on given target child elements
         * @public
         * @name V.mount
         * @kind function
         * @param {Node} target
         * @return {Promise}
         */
        mount: async function (target) {

            var promises = [];

            V._components.forEach(function (_component) {

                V.items(_component.selector, target)
                .forEach(function (element) {

                    if (element._components === undefined) {
                        element._components = {};
                    }

                    var key = _component.namespace;

                    // Already mounted
                    if (element._components[key] !== undefined) {
                        return;
                    }

                    if( !element.dataset.vid ){
                        element.dataset.vid = Math.random().toString(16).substr(2, 8);
                    }

                    // Clone component to this element
                    var component = Object.assign({}, _component);
                        component.element = element;

                    element._components[key] = component;

                    var callbacks = [].concat(
                        _global.beforeMountHooks,
                        [component.beforeMount]
                        [component.onMount],
                        [component.afterMount],
                        _global.afterMountHooks
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