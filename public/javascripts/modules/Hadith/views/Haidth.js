var HadithView = Backbone.View.extend({

    template : Templates.Hadith,

    initialize: function(){
        this.render();
    },
    render : function(){
        this.$el.html(_.template(this.template, this.model.toJSON()));
        this.renderReference();
    },
    renderReference : function(){


    }



});
