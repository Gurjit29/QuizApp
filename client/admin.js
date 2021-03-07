import { getQuestions, deleteQuestionOption, updateQuestion } from './api_requests.js';
import { createQuestion, createOption, createButtonsDiv, questionHasAtleastTwoOptions, optionCanBeCleared, showMessageAlert } from './userInterface.js';

const QUESTION_HOLDER = document.querySelector("#questionsHolder");


// On page load ---> /GET request to API to display the questions from backend
getQuestions().then(data => displayQuestions(data));

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



//PUT -- "save Question"
let saveQuestion = (questionId) => {

  let data = prepareJSONData(questionId);

  console.log(data);

  updateQuestion(data)
  .then(
    response => showMessageAlert(`#messageDiv_${questionId}`, response)
  )


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

        correctAnswer = option.value;
      }

        optionIDs.push(option.id.split("_")[1]);
        options.push(option.value);
      
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



//DELETE -- "DELETE Question"
let deleteQuestion = (questionId) => {



}

window.deleteQuestion = deleteQuestion;













