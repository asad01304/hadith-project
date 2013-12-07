var BookView = Backbone.View.extend({
    template : Templates.Book,

    initialize: function(){
        this.render();
    },
    render : function(){
        this.$el.html(_.template(this.template, this.model.toJSON()));
    }

});
