V.component('[data-router]', {

    /**
     * After render
     * Attach router component changes
     * @param {Function} resolve
     * @return {Promise}
     */
    afterRender: function(resolve){

        var self = this;
        var element = self.element;

        V.router.beforeChange(function(){
            if( !this.next ){
                this.next = V.router.getMatch('404');
            }
            resolve(this);
        });

        V.router.afterChange(async function(){

            var previous = this.previous;
            var next = this.next;

            if (previous && previous.component) {
                var _element = V.$(self.selector + ' ' + previous.component);
                if( _element ){
                    await V.destroy(_element);
                }
            }

            if (next && next.component) {
                element.innerHTML = next.html;
                await V.mount(element);
            }

            resolve(this);
        });

        resolve(this);

    }

});