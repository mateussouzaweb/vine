Vine.register('[data-route-view]', {

    /**
     * After mount
     * Attach route component changes
     */
    onMount: function(component){

        var element = component.element;

        Vine.Route.beforeChange(function(change){
            if( !change.next ){
                change.next = Vine.Route.match('404');
            }
        });

        Vine.Route.afterChange(async function(change){

            var previous = change.previous;
            var next = change.next;

            if (previous && previous.component) {
                await Vine.destroy(element);
            }

            if (next && next.component) {
                element.innerHTML = next.component;
                await Vine.mount(element);
            }

        });

    }

});