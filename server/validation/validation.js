const express = require ('express');

exports.validateQuestion = (req,res,next) => {

  //Question must not be empty
  req.check("questionText")
  .notEmpty()
  .withMessage('Please enter the question title')

 
  //Validation if user entered any options
  req.check("options.*")
  .notEmpty()
  .withMessage('Please enter the option(s) for the question')


   //Validation for correct Answer
   req.check("correctAnswer")
   .notEmpty()
   .withMessage('Please select the right answer for the question')



  var errors = req.validationErrors();

  if(errors){

    //msg is property in validation errors array like = > [{ msg: "" }] --> so use map()
   const firstError=errors.map((error)=> error.msg)[0]

    return res.status(200).json({
        error:firstError
    });
}

//next() so that it proceeds if no errors are found
next();


};