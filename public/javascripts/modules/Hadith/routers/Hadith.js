var HadithRouter = Backbone.Router.extend({

    routes: {
        "":                             "dashboard",
        "chapter/:bookId/:chapterId":   "chapter",
        "hadith/:hadithId"          :   "hadith"
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
            chapterId :chapterId,
            collection: this.getChapters(bookId)
        });

        new HadithListView({
            el : "#content-area",
            bookId : bookId,
            chapterId : chapterId,
            collection: this.getHadiths(bookId, chapterId)
        })
    },

    hadith : function(hadithId){


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
