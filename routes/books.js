exports.list = function(req, res){

    var app = req.app, db  = app.get('db')

    db.query('SELECT * from books', function(err, rows) {

        if(err) return false;

        res.send(JSON.stringify(rows));
    });
};

exports.index = function(req, res){

    var id  = req.params.id;
    var app = req.app, db  = app.get('db');

    db.query('SELECT * from books where id = ?', id,  function(err, rows) {

        if(err) return false;

        res.send(JSON.stringify(rows[0]));
    });
};
