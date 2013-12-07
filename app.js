
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'hadis_project2'
});
connection.connect();
app.set('db', connection);



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs-locals'));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


var hadith = require('./routes/hadith'),
    books  = require('./routes/books'),
    chapter = require('./routes/chapter');

app.get('/', routes.index);

app.get('/books', books.list);
app.get('/books/:id', books.index);

app.get('/chapters/:chapterId', chapter.index);
app.get('/chapters/list/:bookId', chapter.list);


app.get('/hadith/id/:id', hadith.view);
app.get('/hadith/any', hadith.randomView);
app.get('/hadith/list/:chapterId', hadith.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
