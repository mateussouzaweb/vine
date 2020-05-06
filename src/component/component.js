(function (V) {

    // PRIVATE

    /**
     * Global data
     * @private
     * @param {Object}
     */
    var _global = {
        beforeConstructorHooks: [],
        afterConstructorHooks: [],
        beforeDestructorHooks: [],
        afterDestructorHooks: []
    };

    // PUBLIC

    V.extend(V, {

        /**
         * Abstract component
         * @private
         * @var {Object}
         */
        _abstractComponent: {

            /**
             * Component DOM element
             * @public
             * @name V.component.element
             * @var {Node}
             */
            element: null,

            /**
             * Component DOM selector
             * @public
             * @name V.component.element
             * @var {String}
             */
            selector: null,

            /**
             * Component namespace
             * @private
             * @name V.component.namespace
             * @var {String}
             */
            namespace: null,

            /**
             * Component constructor
             * @public
             * @name V.component.constructor
             * @kind function
             * @param {Function} resolve
             * @param {Function} reject
             * @return {Promise}
             */
            constructor: V.fakePromise,

            /**
             * Component destructor
             * @public
             * @name V.component.destructor
             * @kind function
             * @param {Function} resolve
             * @param {Function} reject
             * @return {Promise}
             */
            destructor: V.fakePromise
        },

        /**
         * Global components registry
         * @private
         * @var {Object}
         */
        _components: [],

        /**
         * Add global callback before component constructor
         * @public
         * @name V.beforeConstructor
         * @kind function
         * @param {Function} callback
         * @return {void}
         */
        beforeConstructor: function (callback) {
            _global.beforeConstructorHooks.push(callback);
        },

        /**
         * Add global callback after component constructor
         * @public
         * @name V.afterConstructor
         * @kind function
         * @param {Function} callback
         * @return {void}
         */
        afterConstructor: function (callback) {
            _global.afterConstructorHooks.push(callback);
        },

        /**
         * Add global callback before component destructor
         * @public
         * @name V.beforeDestructor
         * @kind function
         * @param {Function} callback
         * @return {void}
         */
        beforeDestructor: function (callback) {
            _global.beforeDestructorHooks.push(callback);
        },

        /**
         * Add global callback after component destructor
         * @public
         * @name V.afterDestructor
         * @kind function
         * @param {Function} callback
         * @return {void}
         */
        afterDestruct: function (callback) {
            _global.afterDestructorHooks.push(callback);
        },

        /**
         * Create new component
         * @public
         * @name V.component
         * @kind function
         * @param {String} selector
         * @param {Object} data
         * @return {Promise}
         */
        component: async function (selector, data) {

            var component = Object.assign(
                {},
                this._abstractComponent,
                data
            );

            component.selector = selector;
            component.namespace = selector.replace(/[\W_]+/g, '_');

            try {

                var callbacks = [].concat(
                    _global.beforeConstructorHooks,
                    [component.constructor],
                    _global.afterConstructorHooks
                );

                await this.promises(component, callbacks);
                this._components.push(component);

            } catch (error) {
                console.warn('Component construct error:', error);
            }

            return component;
        },

        /**
         * Remove component
         * @public
         * @name V.removeComponent
         * @kind function
         * @param {String} selector
         * @return {Promise}
         */
        removeComponent: async function (selector) {

            var component = null;
            var index = null;

            this._components.forEach(function (theComponent, theIndex) {
                if (theComponent.selector == selector) {
                    component = theComponent;
                    index = theIndex;
                }
            });

            if (!component) {
                return selector;
            }

            try {

                var callbacks = [].concat(
                    _global.beforeDestructorHooks,
                    [component.destructor],
                    _global.afterDestructorHooks
                );

                await this.promises(component, callbacks);
                delete this._components[index];

            } catch (error) {
                console.warn('Component destruct error:', error);
            }

            return selector;
        }

    });

})(window.V);