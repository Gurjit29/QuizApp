import { getQuestions, deleteQuestionOption, updateQuestion,deleteOneQuestion ,addQuestion} from './api_requests.js';
import { createQuestion, createOption, createButtonsDiv, questionHasAtleastTwoOptions, optionCanBeCleared, showMessageAlert , createButton} from './userInterface.js';

const QUESTION_HOLDER = document.querySelector("#questionsHolder");



// On page load ---> /GET request to API to display the questions from backend
export let loadQuestions = () =>{
  getQuestions().then(data => displayQuestions(data));

}


let createNewQuestion = () => {

  const newQuestionDiv = document.createElement("div");

  newQuestionDiv.innerHTML += createQuestion("newQuestion","");

 //newQuestionDiv.innerHTML += `<div id="optionsHolder_newQuestion>`;

 const optionsDiv = document.createElement("div");

 optionsDiv.id= "optionsHolder_newQuestion";
  

  for(let i=1;i<=4;i++){

    optionsDiv.innerHTML += createOption(`newOptions_${i}`,"newQuestion",null,"");

  }
  //newQuestionDiv.innerHTML+=`</div>`;

  newQuestionDiv.innerHTML += createButton('info','add', 'Add Question','addNewQuestion', 'newQuestion');

  const newQuestionHolder = document.querySelector("#newQuestion");

  newQuestionHolder.appendChild(newQuestionDiv);

  newQuestionDiv.insertBefore(optionsDiv,document.querySelector("#add_newQuestion"));

}

if(document.querySelector("#newQuestion")){
  createNewQuestion();
  loadQuestions();
}





//Populate UI with questions
let displayQuestions = (data) => {

  data["questions"].forEach((question) => {

    const questionsDiv = document.createElement("div");

    questionsDiv.className = `question_${question.questionID}`;

    //create a question
    questionsDiv.innerHTML += createQuestion(question.questionID, question.questionText);

    //options wrapper
    let optionsDiv = document.createElement("div");

    optionsDiv.id = `optionsHolder_${question.questionID}`;

    question.options.forEach((option, index) => {

      //create question options - one by one
      optionsDiv.innerHTML += createOption(question.optionID[index], question.questionID, question.correctAnswer, option);

    });

    QUESTION_HOLDER.appendChild(questionsDiv);

    questionsDiv.appendChild(optionsDiv);

    //create utility buttons <div>
    createButtonsDiv(question.questionID, questionsDiv);

    questionsDiv.innerHTML += `<hr style="height:10px;">`;

    let questionArea = document.querySelector(`#question_${question.questionID}`);

    questionArea.style.height = questionArea.scrollHeight+"px";

  });

}


//DELETE option
let deleteOption = (optionId, questionId, correctAnswer) => {

  let requestBody = { "optionID": optionId };
  console.log(requestBody);

  if (questionHasAtleastTwoOptions(questionId)) {
    if (optionCanBeCleared(optionId, correctAnswer)) {

      deleteQuestionOption(requestBody)
        .then(
          response => {
            showMessageAlert(`#messageDiv_${questionId}`, response)

          }
        )

    }
    else {
      let message = { "error": `"<span style="font-weight:bold">${correctAnswer}</span>" is the right answer so it cant be deleted.` };
      showMessageAlert(`#messageDiv_${questionId}`, message);
    }
  }
  else {
    let message = { "error": "Delete not allowed  -  question must have at least 2 options" };
    showMessageAlert(`#messageDiv_${questionId}`, message);

  }
}
window.deleteOption = deleteOption;

//Check for duplicated in the options
let hasDuplicateOptions = (options) => {
  return new Set(options).size !== options.length ;
}

let showDuplicateEntriesError = (questionId) => {
  showMessageAlert(`#messageDiv_${questionId}`, {"error" : "No Duplicate Options are allowed!"});
}


//PUT -- "save Question"
let saveQuestion = (questionId) => {

  let data = prepareJSONData(questionId);

  console.log(data);

  if(!hasDuplicateOptions(data['options'])){
  updateQuestion(data)
  .then(
    response =>
    {
      showMessageAlert(`#messageDiv_${questionId}`, response);
      if(response["message"]){

        setTimeout(()=>{
          document.querySelector(`#questionsHolder`).innerHTML = "";
          loadQuestions();
        },2200);


      }
     
      

    } 
  )
  }else{
    showDuplicateEntriesError(questionId);
  }


}

window.saveQuestion = saveQuestion;


let prepareJSONData = (questionId) =>{

  let questionText = document.querySelector(`#question_${questionId}`).value.trim();

  let options = [];
  let optionIDs = [];

  let questionOptions = document.querySelectorAll(`#optionsHolder_${questionId} > div > input`);

  let radioButtons = document.querySelectorAll(`#optionsHolder_${questionId} > div > span > input`);

 let correctAnswer = "";

  //Element
  questionOptions.forEach(
    (option,i) => {

      if(radioButtons[i].checked){

        correctAnswer = option.value.trim();
      }

        optionIDs.push(option.id.split("_")[1]);
        options.push(option.value.trim());
      
    }
  );

  let questionData =  {
    "questionText":questionText,
    "correctAnswer":correctAnswer,
    "options":options,
    "optionIDs":optionIDs,
    "questionID":questionId
  };

 return questionData;

}


let addNewQuestion = (questionId) =>{

  let newQuestionData = prepareJSONData(questionId);

  if(!hasDuplicateOptions(newQuestionData['options'])){
  addQuestion(newQuestionData)
  .then (
    (response) => {
      showMessageAlert(`#messageDiv_${questionId}`, response);

      setTimeout(()=>{
      if(response["message"]){
        document.querySelector("#questionsHolder").innerHTML = "";
        loadQuestions();
        document.querySelector("#newQuestion").innerHTML = "";
        createNewQuestion();
      }
    },2200);
    
    }
  )
  }
  else{
    showDuplicateEntriesError(questionId);
  }
}
window.addNewQuestion = addNewQuestion;



//DELETE -- "DELETE Question"
let deleteQuestion = (questionId) => {

  let data = prepareJSONData(questionId);

  console.log(data);

  deleteOneQuestion(data)
  .then(
    response => {
      
      showMessageAlert(`#messageDiv_${questionId}`, response);
      setTimeout(()=>document.querySelector(`.question_${questionId}`).remove(),2200);
      
    }
  )





}

window.deleteQuestion = deleteQuestion;














