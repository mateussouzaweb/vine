(function (V) {

    // NOT DONE YET
    const Router = {

        /**
         * ROUTER DATA
         * @var {Object}
         */
        _data: {
            previousLocation: null,
            activeRoute: null,
            beforeHooks: [],
            afterHooks: [],
            routers: []
        },

        /**
         * Normalize string path
         * @param {String} path
         * @return {String}
         */
        normalizePath: function (path) {

            path = path.replace(window.location.origin, '');
            path = path.split('?').shift();
            path = path.replace(new RegExp('[/]*$'), '');
            path = path.replace(new RegExp('^[/]*'), '');

            return path;
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

            var regex = this.normalizePath(definition.path);
            var pattern = ['(:[a-z]+)'];
            var replace = ['([-0-9a-z]+)'];

            pattern.forEach(function (value, index) {
                regex = regex.replace(new RegExp(value, 'g'), replace[index]);
            });

            regex = new RegExp('^' + regex + '$', 'i');
            definition.regex = regex;

            this._data.routers.push(definition);
        },

        /**
         * Process URL path params
         * @param {String} path
         * @param {Object} match
         * @return {Object}
         */
        processParams: function (path, match) {

            var params = {};
            var parts = this.normalizePath(match.path).split('/');
            var url = this.normalizePath(path);

            url.split('/').forEach(function (value, index) {
                if (':'.charCodeAt(0) === parts[index].charCodeAt(0)) {
                    const key = parts[index].substr(1);
                    params[key] = decodeURIComponent(value);
                }
            });

            return params;
        },

        /**
         * Process query params
         * @param {String} search
         * @return {Object}
         */
        processQuery: function (search) {

            var query = {};

            search = search.trim().replace(/^(\?|#|&)/, '')

            if (search == '') {
                return query;
            }

            search.split('&').forEach(function (param) {

                const parts = param.replace(/\+/g, ' ').split('=');
                const key = decodeURIComponent(parts.shift());
                const value = parts.length > 0 ? decodeURIComponent(parts.join('=')) : null;

                if (query[key] === undefined) {
                    query[key] = value;
                }

            });

            return query;
        },

        /**
         * Match the current route based on given path
         * @param {String} path
         * @return {Object}
         */
        getMatch: function (path) {

            var url = this.normalizePath(path);
            var routers = this._data.routers;
            var match = null;

            for (let index = 0; index < routers.length; index++) {
                const item = routers[index];

                if (url.match(item.regex)) {
                    match = item;
                    break;
                }
            }

            return match;
        },

        /**
         * Retrieve param value
         * @param {String} name
         * @return {mixed}
         */
        getParam: function (name) {

            if (name === undefined) {
                return this._data.params;
            }

            if (this._data.params[name] !== undefined) {
                return this._data.params[name];
            }

            return undefined;
        },

        /**
         * Retrieve query value
         * @param {String} name
         * @return {mixed}
         */
        getQuery: function (name) {

            if (name === undefined) {
                return this._data.query;
            }

            if (this._data.query[name] !== undefined) {
                return this._data.query[name];
            }

            return undefined;
        },

        /**
         * Retrieve the active route config
         * @return {void}
         */
        getActiveRoute: function () {
            return this._data.activeRoute;
        },

        /**
         * Retrieve parsed active route path
         * @return {string}
         */
        getActiveLocation: function () {

            var route = this.getActiveRoute();
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

            this.processChange(newLocation, replaceHistory);
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
        },

        /**
         * Add callback before each route transition
         * @param {Function} callback
         * @return {Void}
         */
        beforeChange: function (callback) {
            this._data.beforeHooks.push(callback);
        },

        /**
         * Add callback after each route transition
         * @param {Function} callback
         * @return {Void}
         */
        afterChange: function (callback) {
            this._data.afterHooks.push(callback);
        },

        /**
         * Process route change
         * @param {String} newLocation
         * @param {Boolean} replaceHistory
         * @return {Void}
         */
        processChange: function (newLocation, replaceHistory) {

            if (this._data.previousLocation
                && newLocation == this._data.previousLocation) {
                return;
            }

            try {

                var previous = this._data.activeRoute;
                var next = this.getMatch(newLocation);

                if (!next) {
                    throw 'Route not found';
                    return;
                }

                var before = this._data.beforeHooks;
                var after = this._data.afterHooks;

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

                this._data.activeRoute = next;

                if (replaceHistory) {
                    history.pushState({}, null, newLocation);
                } else {
                    // history.replaceState({}, null, newLocation);
                }

                var query = this.processQuery(window.location.search);
                var params = this.processParams(newLocation, next);

                this._data.query = query;
                this._data.params = params;
                this._data.previousLocation = newLocation;

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

        }

    }


})(window.V);