(function (V) {

    // PRIVATE

    /**
    * Promise instance
    * @private
    * @param {Function} resolve
    * @param {Function} reject
    * @return {void}
    */
    var _promise = function (resolve, reject) {
        resolve(this);
    };

    /**
     * Global data
     * @private
     * @param {Object}
     */
    var _global = {
        components: [],
        events: {},
        beforeRenderHooks: [],
        afterRenderHooks: [],
        beforeDestroyHooks: [],
        afterDestroyHooks: []
    };

    /**
     * Abstract component
     * @private
     * @param {Object}
     */
    var _abstractComponent = {

        element: null,
        selector: null,
        namespace: null,

        constructor: _promise,
        destructor: _promise,
        shouldRender: _promise,
        beforeRender: _promise,
        onRender: _promise,
        afterRender: _promise,
        beforeDestroy: _promise,
        onDestroy: _promise,
        afterDestroy: _promise,

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

            this
                .element
                ._components[this.namespace][key] = value;

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

            var value = this
                .element
                ._components[this.namespace][key];

            if (value === undefined) {
                return defaultValue;
            }

            return value;
        },

        /**
         * Attach event on component
         * @public
         * @name V.component.on
         * @kind function
         * @param {String} event
         * @param {String|Function} selector
         * @param {Function} callback
         * @return {void}
         */
        on: function (event, selector, callback) {

            var self = this;

            if (callback === undefined) {
                callback = selector;
                selector = self.selector;
            } else {
                selector = self.selector + ' ' + selector;
            }

            var vid = self.element.dataset.vid;
            vid = '[data-vid="' + vid + '"]';

            var fn = function (e) {

                var element = e.target.closest(vid);

                if (!element) {
                    return;
                }

                self.element = element;
                callback.apply(e.target, [e]);

            };

            if (!_global.events[event]) {
                _global.events[event] = {};
            }

            _global.events[event][selector] = V.on(document, event, selector, fn);

        },

        /**
         * Remove event on component
         * @public
         * @name V.component.off
         * @kind function
         * @param {String} event
         * @param {String} selector
         * @return {void}
         */
        off: function (event, selector) {

            if (selector) {
                selector = self.selector + ' ' + selector;
            } else {
                selector = self.selector;
            }

            if (!_global.events[event]) {
                return;
            }

            var fn = _global.events[event][selector];

            if (!fn) {
                return;
            }

            delete _global.events[event][selector];

            V.off(document, event, selector, fn);

        }

    };

    /**
     * Run before render hooks
     * @private
     * @param {Object} instance
     * @return {Promise}
     */
    var beforeRender = async function (instance) {

        var promises = [];

        if (instance.beforeRender) {
            promises.push(
                V.promisify(instance, instance.beforeRender)
            );
        }

        var hooks = _global.beforeRenderHooks;
        for (let index = 0; index < hooks.length; index++) {
            promises.push(
                V.promisify(instance, hooks[index])
            );
        }

        await Promise.all(promises);

        return instance;
    };

    /**
     * Run after render hooks
     * @private
     * @param {Object} instance
     * @return {Promise}
     */
    var afterRender = async function (instance) {

        var promises = [];

        if (instance.afterRender) {
            promises.push(
                V.promisify(instance, instance.afterRender)
            );
        }

        var hooks = _global.afterRenderHooks;
        for (let index = 0; index < hooks.length; index++) {
            promises.push(
                V.promisify(instance, hooks[index])
            );
        }

        // Mount child components
        promises.push(
            V.mount(instance.element)
        );

        await Promise.all(promises);

        return instance;
    };

    /**
     * Run before destroy hooks
     * @private
     * @param {Object} instance
     * @return {Promise}
     */
    var beforeDestroy = async function (instance) {

        var promises = [];

        if (instance.beforeDestroy) {
            promises.push(
                V.promisify(instance, instance.beforeDestroy)
            );
        }

        var hooks = _global.beforeDestroyHooks;
        for (let index = 0; index < hooks.length; index++) {
            promises.push(
                V.promisify(instance, hooks[index])
            );
        }

        await Promise.all(promises);

        return instance;
    };

    /**
     * Run after destroy hooks
     * @private
     * @param {Object} instance
     * @return {Promise}
     */
    var afterDestroy = async function (instance) {

        var promises = [];

        if (instance.afterDestroy) {
            promises.push(
                V.promisify(instance, instance.afterDestroy)
            );
        }

        var hooks = _global.afterDestroyHooks;
        for (let index = 0; index < hooks.length; index++) {
            promises.push(
                V.promisify(instance, hooks[index])
            );
        }

        // unMount child components
        promises.push(
            V.unMount(instance.element)
        );

        await Promise.all(promises);

        return instance;
    };

    /**
     * Mount component on matches selector for given target
     * @private
     * @param {Object} component
     * @param {Node} target
     * @return {Promise}
     */
    var mountComponent = async function (component, target) {

        var promises = [];

        V.items(component.selector, target)
            .forEach(function (element) {

                if (element._components === undefined) {
                    element._components = {};
                }

                var key = component.namespace;

                // Already mounted
                if (element._components[key] !== undefined) {
                    return;
                }

                element._components[key] = {};
                element.dataset.vid = Math.random().toString(16).substr(2, 8);

                component.element = element;

                promises.push(
                    V.mountComponent(component)
                );

            });

        await Promise.all(promises);

        return component;
    };

    /**
     * unMount component on matches selector for given target
     * @private
     * @param {Object} component
     * @param {Node} target
     * @return {Promise}
     */
    var unMountComponent = async function (component, target) {

        var promises = [];

        // Find items for the component on target
        V.items(component.selector, target)
            .forEach(function (element) {

                if (element._components === undefined) {
                    return;
                }

                var key = component.namespace;
                if (element._components[key] === undefined) {
                    return;
                }

                component.element = element;
                delete element._components[key];

                promises.push(
                    V.unMountComponent(component)
                );

            });

        await Promise.all(promises);

        return component;
    };

    // PUBLIC

    V.extend({

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
        },

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
         * Create new component
         * @public
         * @name V.component
         * @kind function
         * @param {String} selector
         * @param {Object} data
         * @return {Promise}
         */
        component: async function (selector, data) {

            var promises = [];
            var component = Object.assign(
                {},
                _abstractComponent,
                data
            );

            component.selector = selector;
            component.namespace = selector.replace(/[\W_]+/g, '_');

            if (typeof component.constructor == 'function') {
                promises.push(
                    V.promisify(component, component.constructor)
                );
            }

            try {

                await Promise.all(promises);
                _global.components.push(component);

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

            var promises = [];
            var component = null;
            var index = null;

            _global.components.forEach(function (theComponent, theIndex) {
                if (theComponent.selector == selector) {
                    component = theComponent;
                    index = theIndex;
                }
            });

            if (!component) {
                return selector;
            }

            promises.push(
                unMountComponent(component, document.body)
            );

            if (typeof component.destructor == 'function') {
                promises.push(
                    V.promisify(component, component.destructor)
                );
            }

            try {

                await Promise.all(promises);
                delete _global.components[index];

            } catch (error) {
                console.warn('Component destruct error:', error);
            }

            return selector;
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

            _global.components.forEach(function (component) {
                promises.push(
                    mountComponent(component, target)
                );
            });

            await Promise.all(promises);

            return target;
        },

        /**
         * unMount components on given target child elements
         * @public
         * @name V.unMount
         * @kind function
         * @param {Node} target
         * @return {Promise}
         */
        unMount: async function (target) {

            var promises = [];

            _global.components.forEach(function (component) {
                promises.push(
                    unMountComponent(component, target)
                );
            });

            await Promise.all(promises);

            return target;
        },

        /**
         * Mount component to start render process
         * @public
         * @name V.mountComponent
         * @kind function
         * @param {Object} component
         * @return {Promise}
         */
        mountComponent: async function (component) {

            var self = this;

            var resolve = function (instance) {
                return self.render(instance);
            };

            var reject = function (instance) {
                return self.render(instance);
            };

            if (typeof component == 'function') {

                try {
                    let instance = await new Promise(component);
                    await resolve(instance);
                } catch (error) {
                    reject(instance);
                }

            } else if (typeof component == 'object') {
                return resolve(component);
            }

            throw 'Unknown component reference';

        },

        /**
         * UnMount component to start destroy process
         * @public
         * @name V.unMountComponent
         * @kind function
         * @param {mixed} component
         * @return {Promise}
         */
        unMountComponent: async function (component) {

            var self = this;

            var resolve = function (instance) {
                return self.destroy(instance);
            };

            var reject = function (instance) {
                return self.destroy(instance);
            };

            if (typeof component == 'function') {
                try {
                    let instance = await new Promise(component);
                    await resolve(instance);
                } catch (error) {
                    reject(instance);
                }
            } else if (typeof component == 'object') {
                return resolve(component);
            }

            throw 'Unknown component reference';

        },

        /**
         * Render component
         * @public
         * @name V.render
         * @kind function
         * @param {Object} component
         * @return {Promise}
         */
        render: async function (component) {

            try {

                var promises = [
                    V.promisify(component, component.shouldRender),
                    beforeRender(component),
                    V.promisify(component, component.onRender),
                    afterRender(component)
                ];

                await Promise.all(promises);

            } catch (error) {
                console.warn('Component render error:', error);
            }

            return component;
        },

        /**
         * Process component destroy
         * @public
         * @name V.destroy
         * @kind function
         * @param {Object} component
         * @return {Promise}
         */
        destroy: async function (component) {

            try {

                var promises = [
                    beforeDestroy(component),
                    V.promisify(component, component.onDestroy),
                    afterDestroy(component)
                ];

                await Promise.all(promises);

            } catch (error) {
                console.warn('Component destroy error:', error);
            }

            return component;
        }

    });

})(window.V);