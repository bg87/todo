var express          = require('express');
var router           = express.Router();
var pg               = require('pg');
var connectionString = 'postgres://localhost:5432/mu';

router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {

    client.query('SELECT * FROM todos',
      function (err, result) {
        done();

        res.send(result.rows);
    });
  });
});

router.post('/', function (req, res) {
  var todo = req.body;
  pg.connect(connectionString, function (err, client, done) {

    client.query( 'INSERT INTO todos (todo, complete)' +
                  'values($1, $2)', [todo.new, todo.complete],
                  function(err, result) {
                    done();

                    if (err) {
                      res.sendStatus(500);
                    }

                    res.sendStatus(201);
                  });
  });
});

router.put('/', function (req, res) {
  console.log(req.body);
  if (req.body.bool == "true") {
  pg.connect(connectionString, function (err, client, done) {
    client.query('UPDATE todos SET complete = TRUE  WHERE id =' + req.body.id + ';',
      function(err, result){
        done();
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
        res.sendStatus(200);
      });
    });
  } else {
    pg.connect(connectionString, function (err, client, done) {
      client.query('UPDATE todos SET complete = FALSE  WHERE id =' + req.body.id + ';',
        function(err, result){
          done();
          if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
          }
          res.sendStatus(200);
        });
      });
    }
});

router.delete('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {

    client.query('DELETE FROM todos WHERE complete = true;',
      function(err, result){
        done();
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
        res.sendStatus(200);
      })
  });
});

module.exports = router;
