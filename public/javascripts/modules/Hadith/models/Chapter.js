var Chapter = Backbone.Model.extend({

    url : function(){
        return '/chapters/' + this.get('id');
    }
});

