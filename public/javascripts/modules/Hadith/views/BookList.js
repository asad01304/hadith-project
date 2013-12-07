var BookListView = DefaultListView.extend({

    template : Templates.BookList,

    initialize : function(opt){

        this.bookId = opt.bookId;
        this.isLoaded() ? this.render(): this.loadCollection();
    },
    getFetchUrl : function(){
        return '/books';
    },
    render : function(){

        this.$el.html(this.template);

        this.collection.each(function(model){
            this.renderItem(model);
        }.bind(this));
    },

    renderItem : function(model){

        var bookView = new BookView({model:model});
        this.$el.append(bookView.$el);

        if(model.id == this.bookId){
            bookView.$el.addClass('selected');
        }
    }
});


