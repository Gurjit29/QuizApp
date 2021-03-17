
import {getStudentView,getQuestions} from './api_requests.js';

import {createQuestion,createOption, showMessageAlert} from './userInterface.js';


const QUESTION_HOLDER = document.querySelector("#questionsHolder");


//load questions
 let loadQuestions = () =>{
  getStudentView().then(data => populateQuestions(data));
}
loadQuestions();

let populateQuestions = (questions) => {

  console.log();

  if(questions['questions'].length == 0 ){

   // document.querySelector("#submitQuiz").remove();
    document.querySelector("#questionsHolder").innerHTML = '<div class="alert alert-primary">No Questions available! Check back later again :) </div>';
  }
  else{

  //remove loader from the page
  document.querySelector("#loader").remove();

  questions["questions"].forEach( (question)=> {

    const questionsDiv = document.createElement("div");

    questionsDiv.id=`question_${question.questionID}`;

    questionsDiv.style.marginBottom ="15px";
  
    questionsDiv.innerHTML+=createQuestion(question.questionID,question.questionText);

    question.options.forEach((option,index) => {

      questionsDiv.innerHTML+=createOption(question.optionID[index], question.questionID, question.correctAnswer, option);

    });

    QUESTION_HOLDER.insertBefore(questionsDiv,document.querySelector("#submitQuiz"));

  });

  configureStudentView();
}

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

  textAreas.forEach(inputField => {

    inputField.readOnly = true

    inputField.style.height = inputField.scrollHeight+"px";
  });


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
      document.querySelector('#submitQuiz').remove();
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

  let correctAnswersIDs= [];

  getQuestions().then(
    data => {
      data['questions'].forEach(question => 
        {
          correctAnswersArray.push(question.correctAnswer)

          //Find optionID of correct answer from the "options" array
          correctAnswersIDs.push(question.optionID[question.options.indexOf(question.correctAnswer)]);
          
        });
        let score = matchAnswers(selectedAnswers,correctAnswersArray);

        document.querySelector("#alertDiv").innerHTML =`<div class="btn btn-warning">
            <h5>Your score is: ${score}/${selectedAnswers.length}</h5></div>`;

            console.log('result --> ',correctAnswersIDs);
        
        showAnswersToStudent(correctAnswersIDs);
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

let showAnswersToStudent = (correctAnswersIDs) => {


  let radioButtons = document.querySelectorAll("input[type='radio']");

  radioButtons.forEach( radioButton => {
    if(radioButton.checked){
      let radioID = radioButton.id.split("_")[1];

      //If radio button is checked, then push corresponding option to the array
      document.querySelector(`#option_div_${radioID}`).style.border = '2px solid red';
    }
   
  });


  correctAnswersIDs.forEach((id)=> {
    document.querySelector(`#option_div_${id}`).style.border='2px solid green';
  })




}
