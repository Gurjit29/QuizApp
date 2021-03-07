let express = require('express');
let mysql = require('mysql');


let pool = mysql.createPool({
  connectionLimit: 10,
  host: "sql472.main-hosting.eu",
  user: "u669410571_quiz_Admin",
  password: "axf0mwjst1/Z",
  database: "u669410571_quizApp"
});

function question(questionText, questionID, correctAnswer, optionID, options) {
  this.questionText = questionText;
  this.questionID = questionID;
  this.correctAnswer = correctAnswer;
  this.optionID = optionID;
  this.options = options;
}

//Retrieve all questions from database
exports.getQuestions = (req, res) => {

  pool.getConnection(function (err, connection) {
    if (err) throw err;

    let sql = `SELECT q.questionText,q.correctAnswer, q.questionID, GROUP_CONCAT(o.optionID) AS optionID, GROUP_CONCAT(o.questionOption) as options
    FROM questions q, options o
    WHERE q.questionID = o.questionID
    GROUP BY q.questionID ORDER BY q.questionID DESC;`;

    connection.query(sql, function (error, results, fields) {

      // const obj = JSON.parse(JSON.stringify(results));

      const questions = [];

      results.forEach(el => {
        const options = el.options.split(',');
        const optionIDs = el.optionID.split(',');

        const questionObj = new question(el.questionText, el.questionID,el.correctAnswer, optionIDs, options);
        questions.push(questionObj);
      });

      res.status(200).json({ questions: questions });


      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error) throw error;
    });
  });

};



//Update a question in the database
exports.updateQuestion = (req, res) => {

  //Add Question to database
  pool.getConnection(function (err, connection) {
    if (err) throw err;

    
    let sql = `UPDATE questions SET questionText = '${req.body.questionText}', correctAnswer = '${req.body.correctAnswer}' WHERE questionID = ${req.body.questionID}`;

    connection.query(sql, function (error, results, fields) {

      //addOptionsToDatabase(results.insertId, req.body.options);
      updateOptionsInDatabase(req.body.questionID,req.body.options,req.body.optionIDs);

      
      res.status(200).json({ message: "The question has been updated in the database" });

      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.uytde
      if (error) throw error;
    });
  });

};

//Update options in the database
let updateOptionsInDatabase = (questionID, options,optionsIds) => {

  options.forEach((option,index) => {

    pool.getConnection(function (err, connection) {
      if (err) throw err;

      let sql ="";

      // if(option == ''){
      //    sql = `DELETE FROM options WHERE questionID = '${questionID}' AND optionID =${optionsIds[index]} `;

      // }
      // else{
        sql = `UPDATE options SET questionOption = '${option}' WHERE questionID = '${questionID}' AND optionID =${optionsIds[index]} `;

     // }
      

      connection.query(sql, function (error, results, fields) {

        // When done with the connection, release it.
        connection.release();
        // Handle error after the release.
        if (error) throw error;
      });
    });

  });

};

//Add a question to the database
exports.addQuestion = (req, res) => {


  //Add Question to database
  pool.getConnection(function (err, connection) {
    if (err) throw err;

    let sql = `INSERT INTO questions (questionText,correctAnswer) values ('${req.body.questionText}','${req.body.correctAnswer}')`;

    connection.query(sql, function (error, results, fields) {

      addOptionsToDatabase(results.insertId, req.body.options);

      res.status(200).json({ message: "The question has been added to the database" });

      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error) throw error;
    });
  });

};


let addOptionsToDatabase = (insertId, options) => {

  options.forEach((option) => {

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


exports.deleteQuestion = (req,res) => {

  pool.getConnection(function (err, connection) {
    if (err) throw err;

    let sql = `DELETE FROM questions WHERE questionID = '${req.body.questionID}'`;

    connection.query(sql, function (error, results, fields) {


      res.status(200).json({ message: "The question has been deleted! " });

      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error) throw error;
    });
  });

};

exports.deleteQuestionOption = (req,res) => {

  pool.getConnection(function (err, connection) {
    if (err) throw err;

    let sql = `DELETE FROM options WHERE optionID = '${req.body.optionID}'`;

    connection.query(sql, function (error, results, fields) {

      res.status(200).json({ message: "The option has been deleted! " });

      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error) throw error;
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


