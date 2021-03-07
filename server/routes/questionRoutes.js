var express=require('express');
var Router=require('Router');
var router=express.Router();

let {getQuestions,addQuestion,updateQuestion,deleteQuestion,deleteQuestionOption,getStudentView} = require('../controllers/questions');
let {validateQuestion} = require('../validation/validation');


router.get("/questions",getQuestions);
router.get("/questions/student",getStudentView);
router.post("/questions",validateQuestion,addQuestion);
router.put("/questions",validateQuestion,updateQuestion);
router.delete("/questions",deleteQuestion);
router.delete("/questions/option",deleteQuestionOption);

module.exports = router;