var express=require('express');
var Router=require('Router');
var router=express.Router();

//var {getAllUsers}=require('../controllers/user');
let {getQuestions,addQuestion} = require('../controllers/questions');
let {validateQuestion} = require('../validation/validation');

router.get("/questions",getQuestions);
router.post("/questions",validateQuestion,addQuestion);


module.exports = router; 