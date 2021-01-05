var V = (function (exports) {
    'use strict';

    var _hooks = [];
    function hook(event, callback) {
        if (callback === undefined) {
            return (_hooks[event]) ? _hooks[event] : [];
        }
        _hooks[event] = _hooks[event] || [];
        _hooks[event].push(callback);
    }
    function each(items, callback) {
        if (Array.isArray(items)) {
            return items.forEach(callback);
        }
        const keys = Object.keys(items);
        for (const key of keys) {
            callback(items[key], key, items);
        }
    }

    function getContext(context) {
        context = (typeof context == 'string') ? $(context) : context;
        context = (context instanceof Node) ? context : document;
        return context;
    }
    function $(selector, context) {
        return getContext(context).querySelector(selector);
    }
    function $$(selector, context) {
        return getContext(context).querySelectorAll(selector);
    }
    function $$$(element, context) {
        var items = [];
        if (typeof element == 'string') {
            element = $$(element, context);
        }
        if (element instanceof Window) {
            items.push(element);
        }
        if (element instanceof HTMLDocument) {
            items.push(element);
        }
        if (element instanceof Element) {
            items.push(element);
        }
        if (element instanceof NodeList) {
            Array.prototype.forEach.call(element, function (item) {
                items.push(item);
            });
        }
        return items;
    }

    function _event(action, element, event, selector, callback) {
        var items = $$$(element);
        var events = event.split(' ');
        var handler;
        if (callback === undefined) {
            handler = selector;
            selector = null;
        }
        else {
            handler = function (e) {
                var target = e.target.closest(selector);
                if (target) {
                    callback.apply(target, [e]);
                }
            };
        }
        items.forEach(function (item) {
            for (var i = 0; i < events.length; i++) {
                if (action == 'add') {
                    item.addEventListener(events[i], handler.bind(item), false);
                }
                else {
                    item.removeEventListener(events[i], handler.bind(item), false);
                }
            }
        });
        return handler;
    }
    function on(element, event, selector, callback) {
        return _event('add', element, event, selector, callback);
    }
    function off(element, event, selector, callback) {
        return _event('remove', element, event, selector, callback);
    }
    function trigger(element, event) {
        var items = $$$(element);
        var theEvent = document.createEvent('HTMLEvents');
        theEvent.initEvent(event, true, true);
        items.forEach(function (item) {
            item.dispatchEvent(theEvent);
        });
    }

    async function fakePromise() { }
    async function promisify(scope, callback) {
        try {
            return await callback.apply(scope);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    async function promises(scope, callbacks) {
        var promises = [];
        for (let index = 0; index < callbacks.length; index++) {
            if (typeof callbacks[index] === 'function') {
                promises.push(promisify(scope, callbacks[index]));
            }
        }
        await Promise.all(promises);
        return scope;
    }

    function template(template, data) {
        var tagRegex = /{{([^}}]+)?}}/g;
        var parser = [];
        var cursor = 0;
        var line = '';
        var before = '';
        var after = '';
        var match;
        parser.push('var r=[];');
        while ((match = tagRegex.exec(template))) {
            line = match[0]
                .replace(/\s+/, ' ')
                .replace(/^{{\s?/, '')
                .replace(/\s?}}$/, '')
                .replace(/^else$/, '} else {')
                .replace(/^end$/, '}')
                .replace(/^if\s?(.*)$/, 'if( this.$1 ){')
                .replace(/^for\s?(.*)\sin\s(.*)$/, 'for( var $1 in this.$2 ){')
                .replace(/^each\s?(.*)\sin\s(.*)$/, 'for( var _$1 in this.$2 ){ this.$1 = this.$2[_$1];')
                .replace(/^(?!}|{|for\(|if\()(.*)/, 'this.$1');
            before = template.slice(cursor, match.index);
            cursor = match.index + match[0].length;
            parser.push('r.push("' + before.replace(/"/g, '\\"') + '");');
            parser.push(line.match(/^(}|{|for\(|if\()/) ? line : 'r.push(' + line + ');');
        }
        after = template.substr(cursor, template.length - cursor);
        parser.push('r.push("' + after.replace(/"/g, '\\"') + '");');
        parser.push('return r.join("");');
        var code = parser.join('').replace(/[\r\t\n]/g, '');
        var result = new Function(code).apply(data || {});
        return result;
    }

    var _components = [];
    var _abstractComponent = {
        element: null,
        selector: null,
        namespace: null,
        constructor: fakePromise,
        destructor: fakePromise,
    };
    function extendComponent(definition) {
        Object.assign(_abstractComponent, definition);
    }
    function eachComponent(target, callback) {
        _components.forEach(function (declaration) {
            var items = $$$(declaration.selector, target);
            items.forEach(function (element) {
                if (element._components === undefined) {
                    element._components = {};
                }
                if (element._state === undefined) {
                    element._state = {};
                }
                if (element._events === undefined) {
                    element._events = {};
                }
                callback.apply(element, [element, declaration]);
            });
        });
    }
    async function component(selector, data) {
        var component = Object.assign({}, _abstractComponent, data);
        component.selector = selector;
        if (!component.namespace) {
            component.namespace = selector.replace(/[\W_]+/g, '_');
        }
        try {
            var callbacks = [].concat([component.constructor]);
            await promises(component, callbacks);
            _components.push(component);
        }
        catch (error) {
            console.warn('[V] Component construct error:', error);
        }
        return component;
    }
    async function removeComponent(selector) {
        var component = null;
        var index = null;
        _components.forEach(function (theComponent, theIndex) {
            if (theComponent.selector == selector) {
                component = theComponent;
                index = theIndex;
            }
        });
        if (!component) {
            return;
        }
        try {
            var callbacks = [].concat([component.destructor]);
            await promises(component, callbacks);
            delete _components[index];
        }
        catch (error) {
            console.warn('[V] Component destruct error:', error);
        }
    }

    extendComponent({
        beforeDestroy: fakePromise,
        onDestroy: fakePromise,
        afterDestroy: fakePromise,
    });
    function beforeDestroy(callback) {
        hook('componentBeforeDestroy', callback);
    }
    function afterDestroy(callback) {
        hook('componentAfterDestroy', callback);
    }
    async function destroy(target) {
        var callbacks = [];
        eachComponent(target, function (element, declaration) {
            var key = declaration.namespace;
            if (element._components[key] === undefined) {
                return;
            }
            var component = element._components[key];
            delete element._components[key];
            var componentCallbacks = [].concat(hook('componentBeforeDestroy'), [component.beforeDestroy], [component.onDestroy], [component.afterDestroy], hook('componentAfterDestroy'));
            callbacks.push(promises(component, componentCallbacks));
        });
        await Promise.all(callbacks);
        return target;
    }

    extendComponent({
        on: function (event, selector, callback) {
            var self = this;
            var element = self.element;
            if (callback === undefined) {
                callback = selector;
                selector = self.selector;
            }
            else {
                selector = self.selector + ' ' + selector;
            }
            var eventId = event + '-' + selector;
            var vid = element.dataset.vid;
            vid = '[data-vid="' + vid + '"]';
            var fn = function (e) {
                var element = e.target.closest(vid);
                if (!element) {
                    return;
                }
                callback.apply(e.target.closest(selector), [e]);
            };
            element._events[eventId] = on(document, event, selector, fn);
        },
        off: function (event, selector) {
            var self = this;
            var element = self.element;
            if (selector) {
                selector = self.selector + ' ' + selector;
            }
            else {
                selector = self.selector;
            }
            var eventId = event + '-' + selector;
            var fn = element._events[eventId];
            if (!fn) {
                return;
            }
            delete element._events[eventId];
            off(document, event, selector, fn);
        }
    });

    extendComponent({
        beforeMount: fakePromise,
        onMount: fakePromise,
        afterMount: fakePromise,
    });
    function beforeMount(callback) {
        hook('componentBeforeMount', callback);
    }
    function afterMount(callback) {
        hook('componentAfterMount', callback);
    }
    async function mount(target) {
        var callbacks = [];
        eachComponent(target, function (element, declaration) {
            var key = declaration.namespace;
            if (element._components[key] !== undefined) {
                return;
            }
            if (!element.dataset.vid) {
                element.dataset.vid = Math.random().toString(16).substr(2, 8);
            }
            var component = Object.assign({}, declaration);
            component.element = element;
            element._components[key] = component;
            var componentCallbacks = [].concat(hook('componentBeforeMount'), [component.beforeMount], [component.onMount], [component.afterMount], hook('componentAfterMount'));
            callbacks.push(promises(component, componentCallbacks));
        });
        await Promise.all(callbacks);
        return target;
    }

    extendComponent({
        template: fakePromise,
        renderTemplate: async function () {
            var _template = await this.template();
            if (_template === undefined || _template === false) {
                return;
            }
            var result = template(String(_template), this.get());
            this.element.innerHTML = result;
        },
        shouldRender: async function () {
            return true;
        },
        beforeRender: fakePromise,
        onRender: fakePromise,
        afterRender: fakePromise,
        render: async function () {
            var component = this;
            var pass = await component.shouldRender();
            if (!pass) {
                return;
            }
            try {
                var callbacks = [].concat(hook('componentBeforeRender'), [component.beforeRender], [component.renderTemplate], [component.onRender], [component.afterRender], hook('componentAfterRender'));
                await promises(component, callbacks);
                await mount(component.element);
            }
            catch (error) {
                console.warn('[V] Component render error:', error);
            }
        }
    });
    function beforeRender(callback) {
        hook('componentBeforeRender', callback);
    }
    function afterRender(callback) {
        hook('componentAfterRender', callback);
    }
    afterMount(async function () {
        return this.render();
    });

    extendComponent({
        set: function (key, value) {
            var element = this.element;
            element._state[key] = value;
        },
        get: function (key, _default) {
            var element = this.element;
            if (key === undefined) {
                return element._state;
            }
            var value = element._state[key];
            value = (value === undefined) ? _default : value;
            return value;
        },
        update: async function () {
            return this.render();
        }
    });

    function interceptBefore(callback) {
        hook('httpInterceptBefore', callback);
    }
    function interceptAfter(callback) {
        hook('httpInterceptAfter', callback);
    }
    async function request(method, url, data, headers) {
        var request = {
            method: method,
            url: url,
            data: data,
            headers: headers,
            options: {},
            response: null
        };
        await promises(request, hook('httpInterceptBefore'));
        if (request.headers) {
            request.options.headers = request.headers;
        }
        if (request.method) {
            request.options.method = request.method;
        }
        if (request.options.method != 'GET') {
            if (request.data instanceof FormData == false) {
                request.data = JSON.stringify(request.data);
            }
            request.options.body = request.data;
        }
        else {
            var query = '';
            if (typeof request.data == 'string') {
                query = request.data;
            }
            else if (request.data) {
                query = Object.keys(request.data).map(function (k) {
                    var _k = encodeURIComponent(k);
                    var _v = encodeURIComponent(request.data[k]);
                    return _k + "=" + _v;
                }).join('&');
            }
            if (query) {
                request.url += '?' + query;
            }
        }
        return fetch(request.url, request.options)
            .then(async function (response) {
            request.response = response;
            await promises(request, hook('httpInterceptAfter'));
            return request.response;
        })
            .then(async function (response) {
            if (!response.ok) {
                throw response;
            }
            const text = await response.text();
            try {
                var json = JSON.parse(text);
                return json;
            }
            catch (error) {
                return text;
            }
        });
    }
    function options(url, data, headers) {
        return request('OPTIONS', url, data, headers);
    }
    function head(url, data, headers) {
        return request('HEAD', url, data, headers);
    }
    function get(url, data, headers) {
        return request('GET', url, data, headers);
    }
    function post(url, data, headers) {
        return request('POST', url, data, headers);
    }
    function put(url, data, headers) {
        return request('PUT', url, data, headers);
    }
    function patch(url, data, headers) {
        return request('PATCH', url, data, headers);
    }
    function _delete(url, data, headers) {
        return request('DELETE', url, data, headers);
    }

    var http = /*#__PURE__*/Object.freeze({
        __proto__: null,
        interceptBefore: interceptBefore,
        interceptAfter: interceptAfter,
        request: request,
        options: options,
        head: head,
        get: get,
        post: post,
        put: put,
        patch: patch,
        _delete: _delete
    });

    var _abstractRoute = {
        path: null,
        regex: null,
        _query: {},
        _params: {},
        param(name) {
            if (name === undefined) {
                return this._params;
            }
            if (this._params[name] !== undefined) {
                return this._params[name];
            }
            return undefined;
        },
        query(name) {
            if (name === undefined) {
                return this._query;
            }
            if (this._query[name] !== undefined) {
                return this._query[name];
            }
            return undefined;
        },
        location() {
            var params = this._params;
            var location = this.path;
            for (const key in params) {
                if (params.hasOwnProperty(key)) {
                    location = location.replace(':' + key, params[key]);
                }
            }
            return location;
        }
    };
    var _routes = [];
    var _active = _abstractRoute;
    var options$1 = {
        mode: window.history.pushState ? 'history' : 'hash',
        base: '',
        prevent: false
    };
    function normalizePath(path, removeQuery) {
        path = path.replace(window.location.origin, '');
        path = path.replace(options$1.base, '');
        path = path.replace(new RegExp('[/]*$'), '');
        path = path.replace(new RegExp('^[/]*'), '');
        path = ('/' + path).replace('//', '/').replace('/?', '?');
        if (removeQuery) {
            path = path.split('?')[0];
        }
        return path;
    }
    function paramsFor(path, match) {
        var params = {};
        var parts = normalizePath(match.path, true)
            .split('/')
            .filter(Boolean);
        var url = normalizePath(path, true)
            .split('/')
            .filter(Boolean);
        url.forEach(function (value, index) {
            if (parts[index] !== undefined && ':'.charCodeAt(0) === parts[index].charCodeAt(0)) {
                const key = parts[index].substr(1);
                params[key] = decodeURIComponent(value);
            }
        });
        return params;
    }
    function queryFor(path) {
        var query = {};
        var search = (path.indexOf('?') !== -1) ? path.split('?')[1] : path;
        search = String(search).trim().replace(/^(\?|#|&)/, '');
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
    }
    function beforeChange(callback) {
        hook('routeBeforeChange', callback);
    }
    function afterChange(callback) {
        hook('routeAfterChange', callback);
    }
    function add(definition) {
        if (Array.isArray(definition)) {
            return definition.forEach(function (item) {
                add(item);
            });
        }
        var route = Object.assign({}, _abstractRoute, definition);
        route.path = normalizePath(route.path, true);
        var regex = route.path;
        var pattern = ['(:[a-zA-Z]+)'];
        var replace = ['([^\/]+)'];
        pattern.forEach(function (value, index) {
            regex = regex.replace(new RegExp(value, 'g'), replace[index]);
        });
        route.regex = new RegExp('^' + regex + '$', 'i');
        _routes.push(route);
    }
    async function change(location, replace) {
        var routeChange = function () {
            if (this.replace) {
                options$1.prevent = true;
                if (options$1.mode === 'history') {
                    history.pushState({}, null, this.location);
                }
                else {
                    window.location.hash = this.location;
                }
                options$1.prevent = false;
            }
            var next = this.next;
            if (!next) {
                return _active = null;
            }
            var query = queryFor(this.location);
            var params = paramsFor(this.location, next);
            next._query = query;
            next._params = params;
            _active = next;
        };
        try {
            location = normalizePath(location);
            var change = {
                previous: _active,
                next: match(location),
                location: location,
                replace: replace
            };
            await promises(change, [].concat(hook('routeBeforeChange'), [routeChange], hook('routeAfterChange')));
        }
        catch (error) {
            console.warn('[V] Route error:', error);
        }
    }
    function match(path) {
        var url = normalizePath(path, true);
        var match = null;
        for (let index = 0; index < _routes.length; index++) {
            const item = _routes[index];
            if (url.match(item.regex)) {
                match = item;
                break;
            }
        }
        return match;
    }
    function active() {
        return _active;
    }
    function redirect(toLocation) {
        change(toLocation, true);
    }
    function go(delta) {
        window.history.go(delta);
    }
    function forward(delta) {
        go(delta == undefined ? 1 : delta);
    }
    function back(delta) {
        go(delta == undefined ? -1 : delta);
    }
    function popstate() {
        if (options$1.prevent) {
            return;
        }
        var path = (options$1.mode === 'hash')
            ? window.location.hash.replace('#', '')
            : window.location.pathname;
        change(path);
    }
    function linkClick(event) {
        var link = event.target.closest('a');
        var location = window.location;
        var stripHash = function (location) {
            return location.href.replace(/#.*/, '');
        };
        if (event.metaKey
            || event.ctrlKey
            || event.shiftKey
            || event.altKey) {
            return;
        }
        if (link.protocol && location.protocol !== link.protocol
            || link.hostname && location.hostname !== link.hostname) {
            return;
        }
        if (options$1.mode !== 'hash'
            && link.href
            && link.href.indexOf('#') > -1
            && stripHash(link) == stripHash(location)) {
            return;
        }
        if (link.target
            && link.target !== '') {
            return;
        }
        if (event.defaultPrevented) {
            return;
        }
        redirect(link.href);
        event.preventDefault();
    }
    function attachEvents() {
        on(window, 'popstate', popstate);
        on(document, 'click', 'a', linkClick);
    }

    var route = /*#__PURE__*/Object.freeze({
        __proto__: null,
        options: options$1,
        beforeChange: beforeChange,
        afterChange: afterChange,
        add: add,
        change: change,
        match: match,
        active: active,
        redirect: redirect,
        go: go,
        forward: forward,
        back: back,
        attachEvents: attachEvents
    });

    function set(name, value) {
        if (value instanceof Object) {
            value = JSON.stringify(value);
        }
        localStorage.setItem(name, value);
    }
    function get$1(name, parse) {
        var value = localStorage.getItem(name);
        if (parse == true && value) {
            value = JSON.parse(value);
        }
        return value;
    }

    var local = /*#__PURE__*/Object.freeze({
        __proto__: null,
        set: set,
        get: get$1
    });

    function set$1(name, value) {
        if (value instanceof Object) {
            value = JSON.stringify(value);
        }
        sessionStorage.setItem(name, value);
    }
    function get$2(name, parse) {
        var value = sessionStorage.getItem(name);
        if (parse == true && value) {
            value = JSON.parse(value);
        }
        return value;
    }

    var session = /*#__PURE__*/Object.freeze({
        __proto__: null,
        set: set$1,
        get: get$2
    });

    const __version = '1.0.0';

    exports.$ = $;
    exports.$$ = $$;
    exports.$$$ = $$$;
    exports.__version = __version;
    exports.afterDestroy = afterDestroy;
    exports.afterMount = afterMount;
    exports.afterRender = afterRender;
    exports.beforeDestroy = beforeDestroy;
    exports.beforeMount = beforeMount;
    exports.beforeRender = beforeRender;
    exports.component = component;
    exports.destroy = destroy;
    exports.each = each;
    exports.eachComponent = eachComponent;
    exports.extendComponent = extendComponent;
    exports.fakePromise = fakePromise;
    exports.hook = hook;
    exports.http = http;
    exports.local = local;
    exports.mount = mount;
    exports.off = off;
    exports.on = on;
    exports.promises = promises;
    exports.promisify = promisify;
    exports.removeComponent = removeComponent;
    exports.route = route;
    exports.session = session;
    exports.template = template;
    exports.trigger = trigger;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}));
