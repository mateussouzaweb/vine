(function (V) {

    // PRIVATE

    /**
     * Attach event to element
     * @private
     * @param {String} action
     * @param {Mixed} element
     * @param {String} event
     * @param {Mixed} selector
     * @param {Mixed} callback
     * @return {Function}
     */
    var _event = function (action, element, event, selector, callback) {

        var items = V.items(element);
        var handler;

        // Determine handler
        if (callback === undefined) {

            // Bind
            handler = selector;
            selector = null;

        } else {

            // Delegated
            handler = function (e) {
                var target = e.target.closest(selector);
                if (target) {
                    callback.apply(target, [e]);
                }
            };

        }

        event = event.split(' ');
        items.forEach(function (item) {

            for (var i = 0; i < event.length; i++) {

                if (action == 'add') {
                    item.addEventListener(
                        event[i],
                        handler.bind(item),
                        false
                    );
                } else {
                    item.removeEventListener(
                        event[i],
                        handler.bind(item),
                        false
                    );
                }

            }
        });

        return handler;
    };

    // PUBLIC

    V.extend({

        /**
         * Add event to element
         * @public
         * @name V.on
         * @kind function
         * @param {Node} element
         * @param {String} event
         * @param {String} selector
         * @param {Function} callback
         * @return {Function}
         */
        on: function (element, event, selector, callback) {
            return _event('add', element, event, selector, callback);
        },

        /**
         * Remove event from element
         * @public
         * @name V.off
         * @kind function
         * @param {Node} element
         * @param {String} event
         * @param {String} selector
         * @param {Function} callback
         * @return {Function}
         */
        off: function (element, event, selector, callback) {
            return _event('remove', element, event, selector, callback);
        },

        /**
         * Trigger event on element
         * @public
         * @name V.trigger
         * @kind function
         * @param {Node} element
         * @param {String} event
         * @return {void}
         */
        trigger: function (element, event) {

            var items = this.items(element);
            var theEvent = document.createEvent('HTMLEvents');

            theEvent.initEvent(event, true, true);

            items.forEach(function (item) {
                item.dispatchEvent(theEvent);
            });

        }

    });

})(window.V);