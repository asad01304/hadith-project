exports.view = function(req, res){

    var id  = req.params.id;
    var app = req.app, db  = app.get('db')


    db.query('SELECT * from hadiths where id = ? limit 0, 1', id,  function(err, rows) {

        if(err) return false;

        var hadidh = rows[0];
        res.send(hadidh.body);

    });
};

exports.list = function(req, res){

    var chapterId = req.params.chapterId;
    var app = req.app, db  = app.get('db')


    db.query('SELECT * from hadiths where chapter_id = ?', chapterId,  function(err, rows) {

        if(err) return false;
        res.send(rows);

    });
};


exports.randomView = function(req, res){

    var app = req.app, db  = app.get('db');

    db.query('SELECT * from hadiths ORDER BY RAND() ASC limit 0, 1',  function(err, rows) {

        if(err) return res.send(err);

        var hadidh = rows[0];
        res.send(hadidh.body);
    });
};