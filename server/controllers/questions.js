let express = require('express');
let mysql = require('mysql');


let pool = mysql.createPool({
  connectionLimit: 10,
  host: "sql472.main-hosting.eu",
  user: "u669410571_quiz_Admin",
  password: "axf0mwjst1/Z",
  database: "u669410571_quizApp"
});


//Retrieve all questions from database
exports.getQuestions = (req, res) => {

  pool.getConnection(function (err, connection) {
    if (err) throw err;

    let sql = `SELECT * FROM questions`;

    connection.query(sql, function (error, results, fields) {

      res.status(200).json({ results });
      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error) throw error;
    });
  });

};

//Add a question to the database
exports.addQuestion = (req,res) => {

  //console.log('It is ---> ',req.body);

  res.status(200).json(req.body);

};

