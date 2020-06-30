(function (V) {

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
            var element = self.element;

            if (callback === undefined) {
                callback = selector;
                selector = self.selector;
            } else {
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

            if (element._events === undefined) {
                element._events = {};
            }

            element._events[eventId] = V.on(
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

            var self = this;
            var element = self.element;

            if (selector) {
                selector = self.selector + ' ' + selector;
            } else {
                selector = self.selector;
            }

            var eventId = event + '-' + selector;

            if (element._events === undefined) {
                element._events = {};
            }

            var fn = element._events[eventId];

            if (!fn) {
                return;
            }

            delete element._events[eventId];
            V.off(document, event, selector, fn);

        }

    });

})(window.V);