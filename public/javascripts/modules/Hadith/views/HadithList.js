var HadithListView = DefaultListView.extend({

    template : Templates.HadithList,

    initialize : function(opt){

        this.bookId    = opt.bookId;
        this.chapterId = opt.chapterId;

        this.isLoaded() ? this.render(): this.loadCollection();
    },
    getFetchUrl : function(){
        return '/hadith/list/' + this.chapterId;
    },
    render : function(){

        this.$el.html(this.template);

        this.collection.each(function(model){
            this.renderItem(model);
        }.bind(this));
    },

    renderItem : function(model){
        var item = new HadithView({model:model});
        this.$el.append(item.$el);
    }
});


