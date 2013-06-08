// Generated by CoffeeScript 1.6.2
(function() {
  var MSG, app, express, io, models, mongoose, port;

  express = require('express');

  app = express();

  port = 80;

  models = require('./models');

  mongoose = require('mongoose');

  MSG = mongoose.model('msg');

  app.use(express["static"](__dirname + '/public'));

  app.set('views', __dirname + '/tpl');

  app.set('view engine', 'jade');

  app.engine('jade', require('jade').__express);

  app.get('/', function(req, res) {
    return res.render('page');
  });

  app.get('/works', function(req, res) {
    console.dir(req.headers);
    return res.send('Works');
  });

  io = require('socket.io').listen(app.listen(port));

  io.sockets.on('connection', function(socket) {
    var clock, d;

    console.log('client connected ');
    console.log(socket.id);
    d = new Date();
    clock = d.toLocaleTimeString();
    socket.emit('message', {
      m: 'welcome to the chat ' + clock
    });
    return socket.on('send', function(data) {
      var msg;

      io.sockets.emit('message', data);
      console.log("Sent Data: ");
      console.dir(data);
      msg = new MSG({
        m: data.m,
        n: "Yash Kumar",
        t: new Date().getTime()
      });
      return msg.save(function(err) {
        if (err) {
          return err;
        } else {
          return console.log("Saved Message: " + msg);
        }
      });
    });
  });

  console.log("Listening on port " + port);

}).call(this);

/*
//@ sourceMappingURL=app.map
*/