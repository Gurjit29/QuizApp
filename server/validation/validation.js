const express = require ('express');

exports.validateQuestion = (req,res,next) => {

  req.check("question")
  .notEmpty()
  .withMessage('Must enter question title')


  var errors = req.validationErrors();

  if(errors){

    //msg is property in validation errors array like = > [{ msg: "" }] --> so use map()
   const firstError=errors.map((error)=> error.msg)[0]

    return res.status(400).json({
        error:firstError
    });
}

//next() so that it proceeds to register if no errors are found
next();


};