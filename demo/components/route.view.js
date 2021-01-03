V.component('[data-route-view]', {

    /**
     * After mount
     * Attach route component changes
     */
    afterMount: function(){

        var self = this;
        var element = self.element;

        V.route.beforeChange(function(){
            if( !this.next ){
                this.next = V.route.match('404');
            }
        });

        V.route.afterChange(async function(){

            var previous = this.previous;
            var next = this.next;

            if (previous && previous.component) {
                await V.destroy(element);
            }

            if (next && next.component) {
                element.innerHTML = next.component;
                await V.mount(element);
            }

        });

    }

});