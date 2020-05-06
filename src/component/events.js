(function (V) {

    // PRIVATE

    /**
     * Global data
     * @private
     * @param {Object}
     */
    var _global = {
        events: {}
    };

    // PUBLIC

    V.extend(V._abstractComponent, {

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
                callback.apply(e.target.closest(selector), [e]);

            };

            if (!_global.events[event]) {
                _global.events[event] = {};
            }

            _global.events[event][selector] = V.on(
                document, event, selector, fn
            );

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

    });

})(window.V);