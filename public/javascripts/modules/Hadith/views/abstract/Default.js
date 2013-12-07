var DefaultView = Backbone.View.extend({
    redirect : function(hash){

        window.location.hash = hash;
    }
});

var DefaultListView = DefaultView.extend({

    isLoaded : function(){
        return (this.collection.size());
    },
    showLoader : function(){
        this.$el.html('Loading..');
    },
    hideLoader : function(){
        this.$el.html('');
    },
    loadCollection : function(){

        this.showLoader();

        this.collection.fetch({

            url : this.getFetchUrl(),
            success : function(){

                this.hideLoader();
                this.render();

            }.bind(this)
        });
    },
    getFetchUrl : function(){
        return '';
    }

});