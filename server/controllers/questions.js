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

 
  //Add Question to database
  pool.getConnection(function (err, connection) {
    if (err) throw err;

    let sql = `INSERT INTO questions (questionText,correctAnswer) values ('${req.body .questionText}','${req.body.correctAnswer}')`;

    connection.query(sql, function (error, results, fields) {

      addOptionsToDatabase(results.insertId,req.body.options);

      res.status(200).json({message: "The question has been added to the database"});

      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error) throw error;
    });
  });


  // console.log("Id ---> ",insert_id);
  //res.status(200).json(req.body);

};


let addOptionsToDatabase = (insertId,options) => {

  // console.log('Insert id ---> ',insertId);
  // console.log(options);


   //Add Question Options to database
   options.forEach((option)=> {

    pool.getConnection(function (err, connection) {
      if (err) throw err;
  
      let sql = `INSERT INTO options (questionId,questionOption) values ('${insertId}','${option}')`;
  
      connection.query(sql, function (error, results, fields) {
  
        // When done with the connection, release it.
        connection.release();
        // Handle error after the release.
        if (error) throw error;
      });
    });

   });


   


};


/**
 * 
 * ALTER table `options` ADD CONSTRAINT
    FOREIGN KEY (`questionID`)
    REFERENCES `questions`(`questionID`)
    ON DELETE CASCADE

 */


