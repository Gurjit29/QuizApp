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
    GROUP BY q.questionID;`;

    connection.query(sql, function (error, results, fields) {

     
      // const obj = JSON.parse(JSON.stringify(results));

      const questions = [];
      console.log(results)

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


/**
 *
 * ALTER table `options` ADD CONSTRAINT
    FOREIGN KEY (`questionID`)
    REFERENCES `questions`(`questionID`)
    ON DELETE CASCADE

 */


