var express=require('express');
var Router=require('Router');
var router=express.Router();


//var {getAllUsers}=require('../controllers/user');
let {getQuestions,addQuestion,updateQuestion,deleteQuestion} = require('../controllers/questions');
let {validateQuestion} = require('../validation/validation');

router.get("/questions",getQuestions);
router.post("/questions",validateQuestion,addQuestion);
router.put("/questions",validateQuestion,updateQuestion);
router.delete("/questions",deleteQuestion);


module.exports = router; 