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
