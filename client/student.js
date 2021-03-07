
import {getStudentView,getQuestions} from './api_requests.js';

import {createQuestion,createOption, showMessageAlert} from './userInterface.js';


const QUESTION_HOLDER = document.querySelector("#questionsHolder");


//load questions
 let loadQuestions = () =>{
  getStudentView().then(data => populateQuestions(data));
}
loadQuestions();

let populateQuestions = (questions) => {

  questions["questions"].forEach( (question)=> {

    const questionsDiv = document.createElement("div");

    questionsDiv.id=`question_${question.questionID}`;

    questionsDiv.style.marginBottom ="15px";
  
    questionsDiv.innerHTML+=createQuestion(question.questionID,question.questionText);

    question.options.forEach((option,index) => {

      questionsDiv.innerHTML+=createOption(question.optionID[index], question.questionID, question.correctAnswer, option);

    });

    QUESTION_HOLDER.appendChild(questionsDiv);

  });

  configureStudentView();

}


let configureStudentView = () => {

  //Remove all the buttons
  let buttons = document.querySelectorAll(".btn-danger");

  buttons.forEach(button => button.remove());

  //Make input fields readonly
  let inputFields = document.querySelectorAll("input[type='text']");

  inputFields.forEach(inputField => inputField.readOnly = true);

  //Make textareas readonly
  let textAreas = document.querySelectorAll("textarea");

  textAreas.forEach(inputField => inputField.readOnly = true);


}

let validateQuiz = () => {


  let selectedAnswers = [];

  let radioButtons = document.querySelectorAll("input[type='radio']");

  radioButtons.forEach( radioButton => {
    if(radioButton.checked){
      let radioID = radioButton.id.split("_")[1];
      
      //If radio button is checked, then push corresponding option to the array
      selectedAnswers.push(document.querySelector(`#text_${radioID}`).value);
    }
   
  });

 
    if(!hasEmptyAnswers(selectedAnswers))
    {
      calculateScore(selectedAnswers);
    }
    else{
      showMessageAlert(`#alertDiv`,{"error":"Please select answers to all questions!"});
    }
     
    

};
window.validateQuiz=validateQuiz;


let hasEmptyAnswers = (selectedAnswers) => {

  let questions = document.querySelectorAll("textarea");

  return selectedAnswers.length != questions.length;

}

let calculateScore = (selectedAnswers) => {

  console.log(selectedAnswers);

  let correctAnswersArray = [];

  getQuestions().then(
    data => {
      data['questions'].forEach(question => 
        {
          correctAnswersArray.push(question.correctAnswer)
          
        });
        let score = matchAnswers(selectedAnswers,correctAnswersArray);

        document.querySelector("#alertDiv").innerHTML +=`<div class="btn btn-warning">
            <h5>Your score is: ${score}/${selectedAnswers.length}</h5></div>`;
        
        showAnswersToStudent(selectedAnswers,correctAnswersArray);
    }
  );

}

let matchAnswers = (userAnswers, correctAnswers) => {

  let score = 0;
  userAnswers.forEach((answer,i)=>{

    
      if(answer == correctAnswers[i]){
        score++;
      }

  });

  return score;
}

let showAnswersToStudent = () => {

  
}
