var express = require('express.io');
var http = require('http');
var path = require('path');
var app = express();
var routes = require('./routes');
app.http().io();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('secret'));
app.use(express.cookieSession());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Setup the ready route, join room and broadcast to room.
app.io.route('ready', function(req) {
    req.io.join(req.data);
    req.io.room(req.data).broadcast('announce', {
        message: 'New client in the ' + req.data + ' room. '
    });
});

// Send the client html.
app.get('/', routes.index);

// http.createServer(app).listen(app.get('port'), function test () {
//     console.log('Express server listening on port ' + app.get('port'));
// });
app.listen(3000);