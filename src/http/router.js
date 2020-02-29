(function (V) {

    // PRIVATE

    /**
     * Global data
     * @var {Object}
     */
    var _global = {
        routes: [],
        beforeHooks: [],
        afterHooks: [],
        previousLocation: null,
        activeRoute: null
    };

    /**
     * Normalize string path
     * @param {String} path
     * @return {String}
     */
    var normalizePath = function (path) {

        path = path.replace(window.location.origin, '');
        path = path.split('?').shift();
        path = path.replace(new RegExp('[/]*$'), '');
        path = path.replace(new RegExp('^[/]*'), '');

        return path;
    };

    /**
     * Process URL and retrieve route params
     * @param {String} path
     * @param {Object} match
     * @return {Object}
     */
    var retrieveRouteParams = function (path, match) {

        var params = {};
        var parts = normalizePath(match.path).split('/');
        var url = normalizePath(path);

        url.split('/').forEach(function (value, index) {
            if (':'.charCodeAt(0) === parts[index].charCodeAt(0)) {
                const key = parts[index].substr(1);
                params[key] = decodeURIComponent(value);
            }
        });

        return params;
    };

    /**
     * Process URL and retrieve query params
     * @param {String} search
     * @return {Object}
     */
    var retrieveQueryParams = function (search) {

        var params = {};

        search = search.trim().replace(/^(\?|#|&)/, '')

        if (search == '') {
            return params;
        }

        search.split('&').forEach(function (param) {

            const parts = param.replace(/\+/g, ' ').split('=');
            const key = decodeURIComponent(parts.shift());
            const value = parts.length > 0 ? decodeURIComponent(parts.join('=')) : null;

            if (params[key] === undefined) {
                params[key] = value;
            }

        });

        return params;
    };

    /**
     * Match the current route based on given path
     * @param {String} path
     * @return {Object}
     */
    var getRouteMatch = function (path) {

        var url = normalizePath(path);
        var routes = _global.routes;
        var match = null;

        for (let index = 0; index < routes.length; index++) {
            const item = routes[index];

            if (url.match(item.regex)) {
                match = item;
                break;
            }
        }

        return match;
    };

    /**
     * Process route change
     * @param {String} newLocation
     * @param {Boolean} replaceHistory
     * @return {Void}
     */
    processChange = function (newLocation, replaceHistory) {

        if (_global.previousLocation
            && newLocation == _global.previousLocation) {
            return;
        }

        try {

            var previous = _global.activeRoute;
            var next = getRouteMatch(newLocation);

            if (!next) {
                throw 'Route not found';
            }

            var before = _global.beforeHooks;
            var after = _global.afterHooks;

            // Before hooks
            for (let index = 0; index < before.length; index++) {
                var result = before[index](previous, next);
                if (typeof result == 'function') {
                    return result();
                }
                if (typeof result == 'object') {
                    next = result;
                }
            }

            _global.activeRoute = next;

            if (replaceHistory) {
                history.pushState({}, null, newLocation);
            } else {
                // history.replaceState({}, null, newLocation);
            }

            var query = retrieveQueryParams(window.location.search);
            var params = retrieveRouteParams(newLocation, next);

            _global.query = query;
            _global.params = params;
            _global.previousLocation = newLocation;

            // After hooks
            for (let index = 0; index < after.length; index++) {
                var result = after[index](previous, next);
                if (typeof result == 'function') {
                    return result();
                }
                if (typeof result == 'object') {
                    next = result;
                }
            }

            // Pass to component
            if (previous && previous.component) {
                Component.unMount(
                    previous.component
                );
            }

            if (next.component) {
                Component.mount(
                    next.component
                );
            }

        } catch (error) {
            console.error(error);
        }

    };

    // PUBLIC
    V.extend({
        router: {

            /**
             * Add callback before each route transition
             * @param {Function} callback
             * @return {Void}
             */
            beforeChange: function (callback) {
                _global.beforeHooks.push(callback);
            },

            /**
             * Add callback after each route transition
             * @param {Function} callback
             * @return {Void}
             */
            afterChange: function (callback) {
                _global.afterHooks.push(callback);
            },

            /**
             * Add route to routes
             * @param {Object} definition
             * @return {void}
             */
            add: function (definition) {

                if (Array.isArray(definition)) {
                    var self = this;
                    definition.forEach(function (item) {
                        self.add(item);
                    });
                    return;
                }

                var regex = normalizePath(definition.path);
                var pattern = ['(:[a-z]+)'];
                var replace = ['([-0-9a-z]+)'];

                pattern.forEach(function (value, index) {
                    regex = regex.replace(new RegExp(value, 'g'), replace[index]);
                });

                regex = new RegExp('^' + regex + '$', 'i');
                definition.regex = regex;

                _global.routes.push(definition);

            },

            /**
             * Retrieve route param value
             * @param {String} name
             * @return {mixed}
             */
            getParam: function (name) {

                if (name === undefined) {
                    return _global.params;
                }

                if (_global.params[name] !== undefined) {
                    return _global.params[name];
                }

                return undefined;
            },

            /**
             * Retrieve query param value
             * @param {String} name
             * @return {mixed}
             */
            getQuery: function (name) {

                if (name === undefined) {
                    return _global.query;
                }

                if (_global.query[name] !== undefined) {
                    return _global.query[name];
                }

                return undefined;
            },

            /**
             * Retrieve the active route config
             * @return {void}
             */
            getActive: function () {
                return _global.activeRoute;
            },

            /**
             * Retrieve parsed active route path
             * @return {string}
             */
            getLocation: function () {

                var route = this.getActive();
                var params = this.getParam();
                var location = route.path;

                for (const key in params) {
                    if (params.hasOwnProperty(key)) {
                        location = location.replace(':' + key, params[key]);
                    }
                }

                return location;
            },

            /**
             * Redirect route to given location path
             * @param {String} location
             * @return {void}
             */
            redirect: function (location) {

                var replaceHistory = true;
                var newLocation = location;

                processChange(newLocation, replaceHistory);
            },

            /**
             * Go back to the previous route
             * @param {Number} level
             * @return {void}
             */
            goBack: function (level) {

                if (level == undefined) {
                    level = -1;
                }

                window.history.go(level);
            }

        }
    });

})(window.V);