const express = require ('express');

exports.validateQuestion = (req,res,next) => {

  //Question must not be empty
  req.check("questionText")
  .notEmpty()
  .withMessage('Please enter the question title')

  //Must have a correctAnswer
  req.check("correctAnswer")
  .notEmpty()
  .withMessage('Please select a correct answer for the question')

  //Validation if user entered any options
  req.check("options")
  .notEmpty()
  .withMessage('Please enter at least one option for the question')


  var errors = req.validationErrors();

  if(errors){

    //msg is property in validation errors array like = > [{ msg: "" }] --> so use map()
   const firstError=errors.map((error)=> error.msg)[0]

    return res.status(400).json({
        error:firstError
    });
}

//next() so that it proceeds if no errors are found
next();


};