var BookCollection = Backbone.Collection.extend({
    model : Book,
    url   : '/books'
});
