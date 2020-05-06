(function (V) {

    // PRIVATE

    /**
     * Global data
     * @private
     * @param {Object}
     */
    var _global = {
        beforeRenderHooks: [],
        afterRenderHooks: []
    };

    // PUBLIC

    V.extend(V._abstractComponent, {

        /**
         * Component should render
         * @public
         * @name V.component.shouldRender
         * @kind function
         * @param {Function} resolve
         * @param {Function} reject
         * @return {Promise}
         */
        shouldRender: V.fakePromise,

        /**
         * Component before render
         * @public
         * @name V.component.beforeRender
         * @kind function
         * @param {Function} resolve
         * @param {Function} reject
         * @return {Promise}
         */
        beforeRender: V.fakePromise,

        /**
         * Component on render
         * @public
         * @name V.component.onRender
         * @kind function
         * @param {Function} resolve
         * @param {Function} reject
         * @return {Promise}
         */
        onRender: V.fakePromise,

        /**
         * Component after render
         * @public
         * @name V.component.afterRender
         * @kind function
         * @param {Function} resolve
         * @param {Function} reject
         * @return {Promise}
         */
        afterRender: V.fakePromise

    });

    V.extend(V, {

        /**
         * Add global callback before component render
         * @public
         * @name V.beforeRender
         * @kind function
         * @param {Function} callback
         * @return {void}
         */
        beforeRender: function (callback) {
            _global.beforeRenderHooks.push(callback);
        },

        /**
         * Add global callback after component render
         * @public
         * @name V.afterRender
         * @kind function
         * @param {Function} callback
         * @return {void}
         */
        afterRender: function (callback) {
            _global.afterRenderHooks.push(callback);
        }

    });

    // API

    /**
     * Render component
     * @private
     * @param {Function} resolve
     * @return {Promise}
     */
    var render = async function (resolve) {

        var component = this;

        try {

            var callbacks = [].concat(
                [ component.shouldRender ],
                _global.beforeRenderHooks,
                [ component.beforeRender ],
                [ component.onRender ],
                [ component.afterRender ],
                _global.afterRenderHooks
            );

            await V.promises(component, callbacks);

            // Mount child elements
            await V.mount(component.element);

        } catch (error) {
            console.warn('Component render error:', error);
            //reject(error);
        }

        return resolve(component);
    }

    V.afterMount(render);

})(window.V);