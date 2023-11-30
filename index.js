const express = require('express')//import express fw
const app = express()//spusteni expresu
const port = 80//definovani portu
const path = require('path');//pro manipulaci s cestami, ať už se jedná o absolutní cesty, relativní cesty
const bodyParser = require('body-parser');//imort bodyParseru


app.use(bodyParser.urlencoded({ extended: false }));//dekoduje data poslana pres POST
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

var mysql = require('mysql2');

const con = mysql.createConnection({
  host: '192.168.1.161',
  user: 'vitek.hoang',
  password: 'BookOfDarkness',
  database: 'vitek.hoang',
  port: 3001
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


app.get('/', (req, res) => {

    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM test_1", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.render('index', { result });
        });
      });

})


  app.post('/vitek.hoang', function (request, response, next) {
var sql = `INSERT INTO test_1 (fname, lname,Age,gender,Class) VALUES ('${request.body.fname}', '${request.body.lname}', '${request.body.Age}', '${request.body.gender}', '${request.body.Class}')`;
      con.query(sql, (error, results, fields) => {
        if (error) {
          console.error(error);
          return;
        }
        console.log(`Uživatele byli vloženi do DB`);
      })
      response.redirect('/');
     
    })

app.get('/newuser', (req, res) => {
  res.render('newuser');
})


app.post('/delete', (req, res) => {
  const userId = req.body.id;
  const deleteQuery = `DELETE FROM test_1 WHERE ID = ${userId}`;

  con.query(deleteQuery, (error, results, fields) => {
      if (error) {
          console.error(error);
          res.send('Error deleting user');
          return;
      }
      console.log(`User with ID ${userId} has been deleted`);
      res.redirect('/');
  });
});

app.listen(port)

