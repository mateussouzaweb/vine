(function (V) {

    // Selector lib
    V.extend({

        /**
         * Select an single element
         * @public
         * @name V.$
         * @kind function
         * @param {String} selector
         * @param {Mixed} context
         * @return {Node}
         */
        $: function (selector, context) {
            context = (context instanceof Node) ? context : document;
            return context.querySelector(selector);
        },

        /**
         * Select multiples elements
         * @public
         * @name V.$$
         * @kind function
         * @param {String} selector
         * @param {Mixed} context
         * @return {NodeList}
         */
        $$: function (selector, context) {
            context = (context instanceof Node) ? context : document;
            return context.querySelectorAll(selector);
        },

        /**
         * Parse selector and return array of items
         * @public
         * @name V.items
         * @kind function
         * @param {Mixed} element
         * @param {Mixed} context
         * @return {Array}
         */
        items: function (element, context) {

            var items = [];

            if (typeof element == 'string') {
                element = this.$$(element, context);
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

    });

})(window.V);