var express=require('express');
var Router=require('Router');
var router=express.Router();

//var {getAllUsers}=require('../controllers/user');
let {getQuestions} = require('../controllers/questions');

router.get("/questions",getQuestions);

module.exports = router; 