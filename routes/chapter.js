exports.list = function(req, res){

    var bookId = req.params.bookId;
    var app = req.app, db  = app.get('db');


    db.query("SELECT * from chapters where book_id = ? order by sort_order desc", bookId,  function(err, rows) {

        if(err) return false;

        res.send(JSON.stringify(rows));
    });
};

exports.index = function(req, res){


    var chapterId = req.params.chapterId;

    var app = req.app, db  = app.get('db');

    db.query('SELECT * from chapters where id = ?', chapterId,  function(err, rows) {

        if(err) return false;

        res.send(JSON.stringify(rows[0]));
    });
};
