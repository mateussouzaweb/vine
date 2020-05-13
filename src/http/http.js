(function (V) {

    // PRIVATE

    /**
     * Global data
     * @private
     * @param {Object}
     */
    var _global = {
        interceptBeforeHooks: [],
        interceptAfterHooks: []
    };

    /**
     * Decode data to the correct format
     * @private
     * @param {mixed} data
     * @return {Object}
     */
    var decodeData = function (data) {

        var result = {};

        if( data instanceof FormData ){
            result = data;
        }else if (typeof data == 'object') {
            result = data;
        }else if (typeof data == 'string') {

            data.split('&').forEach(function (param) {

                const parts = param.replace(/\+/g, ' ').split('=');
                const key = decodeURIComponent(parts.shift());
                const value = parts.length > 0 ? decodeURIComponent(parts.join('=')) : null;

                if (result[key] === undefined) {
                    result[key] = value;
                }

            });

        }

        return result;
    };

    // PUBLIC
    V.extend(V, {

        /**
         * HTTP request lib
         * @name V.http
         */
        http: {

            /**
             * Add interceptor callback before each HTTP request
             * @public
             * @name V.http.interceptBefore
             * @kind function
             * @param {Function} callback
             * @return {void}
             */
            interceptBefore: function (callback) {
                _global.interceptBeforeHooks.push(callback);
            },

            /**
             * Add interceptor callback after each HTTP request
             * @public
             * @name V.http.interceptAfter
             * @kind function
             * @param {Function} callback
             * @return {void}
             */
            interceptAfter: function (callback) {
                _global.interceptAfterHooks.push(callback);
            },

            /**
             * Make HTTP requests
             * @async
             * @public
             * @name V.http.request
             * @kind function
             * @param {String} method
             * @param {String} url
             * @param {Object} data
             * @param {Object} headers
             * @return {Promise}
             */
            request: async function (method, url, data, headers) {

                var request = {
                    method: method,
                    url: url,
                    data: data,
                    headers: headers,
                    options: {},
                    response: null
                };

                request = await V.promises(
                    request,
                    _global.interceptBeforeHooks
                );

                if (request.headers) {
                    request.options.headers = request.headers;
                }
                if (request.method) {
                    request.options.method = request.method;
                }

                var _data = decodeData(request.data);

                if (request.options.method != 'GET') {

                    if( _data instanceof FormData == false ){
                        _data = JSON.stringify(_data);
                    }

                    request.options.body = _data;

                } else {

                    var query = Object.keys(_data).map(function (k) {
                        var _k = encodeURIComponent(k);
                        var _v = encodeURIComponent(_data[k]);
                        return _k + "=" + _v;
                    }).join('&');

                    if (query) {
                        request.url += '?' + query;
                    }

                }

                return fetch(request.url, request.options)
                .then(function (response) {
                    request.response = response;

                    return V.promises(
                        request,
                        _global.interceptAfterHooks
                    );
                })
                .then(function (request) {
                    return request.response;
                })
                .then(function (response) {

                    if (!response.ok) {
                        throw response;
                    }

                    return response.text().then(function (text) {
                        try {
                            var json = JSON.parse(text);
                            return json;
                        } catch (e) {
                            return text;
                        }
                    });
                });
            },

            /**
             * Make GET HTTP requests
             * @public
             * @name V.http.get
             * @kind function
             * @param {String} url
             * @param {Object} data
             * @param {Object} headers
             * @return {Promise}
             */
            get: function (url, data, headers) {
                return this.request('GET', url, data, headers);
            },

            /**
             * Make POST HTTP requests
             * @public
             * @name V.http.post
             * @kind function
             * @param {String} url
             * @param {Object} data
             * @param {Object} headers
             * @return {Promise}
             */
            post: function (url, data, headers) {
                return this.request('POST', url, data, headers);
            },

            /**
             * Make PUT HTTP requests
             * @public
             * @name V.http.put
             * @kind function
             * @param {String} url
             * @param {Object} data
             * @param {Object} headers
             * @return {Promise}
             */
            put: function (url, data, headers) {
                return this.request('PUT', url, data, headers);
            },

            /**
             * Make DELETE HTTP requests
             * @public
             * @name V.http.delete
             * @kind function
             * @param {String} url
             * @param {Object} data
             * @param {Object} headers
             * @return {Promise}
             */
            delete: function (url, data, headers) {
                return this.request('DELETE', url, data, headers);
            }

        }

    });

})(window.V);