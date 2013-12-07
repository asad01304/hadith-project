var ChapterListView = DefaultListView.extend({

    template : Templates.ChapterList,

    initialize : function(opt){

        this.bookId = opt.bookId;

        this.isLoaded() ? this.render(): this.loadCollection();
    },
    getFetchUrl : function(){
        return '/chapters/list/' + this.bookId;
    },
    render : function(){

        this.$el.html(this.template);

        this.collection.each(function(model){
            this.renderItem(model);
        }.bind(this));
    },

    renderItem : function(model){
        var item = new ChapterView({model:model});
        this.$el.append(item.$el);
    }
});


