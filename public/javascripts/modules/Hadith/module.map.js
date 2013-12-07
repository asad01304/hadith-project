(function (){

var Templates = {"Book":"<div class=\"book\"> <%= title %></div>","BookList":"<div class=\"books\"> <h3>Books</h3> <div class=\"list-container\"></div></div>","Chapter":"<div class=\"chapter\" data-book=\"<%= book_id %>\" data-chapter=\"<%= id%> \"> <%= title %></div>","ChapterList":"<div class=\"chapters\"> <h3>Chapters</h3> <div class=\"list-container\"></div></div>","Hadith":"<div class=\"hadith\"> <% var body = body.replace(/(\\([^(]+\\))$/, \"<span class=reference>$1</span>\") ; %> <span class=\"hadith-body\"><%= body %></span> <span class=\"narrator\"><%= narrator %></span></div>","HadithList":"<div class=\"hadiths\"> <h3>Hadiths</h3> <div class=\"list-container\"></div></div>"}

var Book = Backbone.Model.extend({});
var BookCollection = Backbone.Collection.extend({
    model : Book,
    url   : '/books'
});

var Chapter = Backbone.Model.extend({

    url : function(){
        return '/chapters/' + this.get('id');
    }
});


var ChapterCollection = Backbone.Collection.extend({
    model : Chapter
});


var Hadith = Backbone.Model.extend({});
var HadithCollection = Backbone.Collection.extend({
    model : Hadith
});

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
var BookView = Backbone.View.extend({
    template : Templates.Book,

    initialize: function(){
        this.render();
    },
    render : function(){
        this.$el.html(_.template(this.template, this.model.toJSON()));
    }

});

var BookListView = DefaultListView.extend({

    template : Templates.BookList,

    initialize : function(){
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
    }
});



var ChapterView = DefaultView.extend({

    template : Templates.Chapter,

    events : {
        'click .chapter' : 'viewChapter'
    },

    initialize: function(){
        this.render();
    },
    render : function(){
        this.$el.html(_.template(this.template, this.model.toJSON()));
    },

    viewChapter : function(e){

        var $el       = this.$(e.target);
        var bookId    = $el.attr('data-book');
        var chapterId = $el.attr('data-chapter');

        this.redirect('chapter/' + bookId + '/' + chapterId);
    }

});

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



var HadithRouter = Backbone.Router.extend({

    routes: {
        "":                             "dashboard",
        "chapter/:bookId/:chapterId":   "chapter"
    },
    initialize : function(){
        this.books    = new BookCollection();
        this.chapters = {};
        this.hadiths  = {};
    },

    dashboard : function(){

        var bookId = 1;
        new BookListView({
            el : "#left-section",
            bookId : bookId,
            collection : this.books
        });

        new ChapterListView({
            el : "#content-area",
            bookId : bookId,
            collection: this.getChapters(bookId)
        });
    },

    chapter : function(bookId, chapterId){

        new ChapterListView({
            el : "#left-section",
            bookId : bookId,
            collection: this.getChapters(bookId)
        });

        new HadithListView({
            el : "#content-area",
            bookId : bookId,
            chapterId : chapterId,
            collection: this.getHadiths(bookId, chapterId)
        })
    },

    getChapters : function(bookId){

        this.chapters[bookId] || (this.chapters[bookId] = new ChapterCollection());
        return this.chapters[bookId];

    },

    getHadiths : function(bookId, chapterId){

        this.hadiths[bookId] || (this.hadiths[bookId] = {});
        this.hadiths[bookId][chapterId] || (this.hadiths[bookId][chapterId] =  new HadithCollection());
        return this.hadiths[bookId][chapterId];

    }
});

var router = new HadithRouter();
Backbone.history.start()
})();