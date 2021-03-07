

const API_URI = 'http://localhost:3000/questions';

let questionHolders = document.querySelector("#questions");

//Get questions on document load
getQuestions();

function getQuestions() {

  return fetch(API_URI, {
    method: "GET"
    // headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    // },
    // body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .then(questions => {
      // console.log(questions);
      displayQuestions(questions);
    })
    .catch(err => console.log(err))

}


let displayQuestions = (questions) => {

  Object.keys(questions).forEach(key => {

    questions[key].forEach(question => {

      questionHolders.innerHTML += `<div id="messageDiv_${question.questionID}"></div>`;

      questionHolders.innerHTML += `<div class="questionAndOptionsHolder">

            <textarea id="question_${question.questionID}" class="col-sm-9 form-control" aria-label="With textarea">${question.questionText}
            </textarea>                     
                                      `;

      question.options.forEach((option, index) => {


        questionHolders.innerHTML += `
             <div class="input-group flex-nowrap" id="option_div_${question.optionID[index]}">
                <span class="input-group-text" id="addon-wrapping">
              <input class="form-check-input" type="radio" value="" id="option_${question.optionID[index]}" name="optionFor_${question.questionID}" 
              ${option == question.correctAnswer ? "checked" : ""}>
            </span>
            <input type="text" class="form-control" value="${option}" aria-label="Username" aria-describedby="addon-wrapping">
            <button class="btn btn-danger deleteOptionButton" id="delete_option_${question.optionID[index]}" onClick="deleteOption('${question.optionID[index]}','${question.questionID}')">X</button>
          </div>`;

      });


      questionHolders.innerHTML += `</div>`;

      questionHolders.innerHTML += `<div class="utilityButtons" id="buttons_${question.questionID}" >`;

      questionHolders.innerHTML += `<button type="button" class="btn btn-danger delete" id="delete_${question.questionID}">Delete Question</button>&nbsp;&nbsp;`;

      questionHolders.innerHTML += `<button type="button" class="btn btn-success save" id="save_${question.questionID}">Save Question</button>&nbsp;&nbsp;`;

      questionHolders.innerHTML += `<button type="button" class="btn btn-info addOption" id="addOption_${question.questionID}" onclick="addNewOption('${question.questionID}')">Add Option</button>&nbsp;&nbsp;`;

      questionHolders.innerHTML += `</div>`;


      

      questionHolders.innerHTML += `<hr style="height:10px;">`;

      //  console.log(question.questionText);

    });

  })
}


let deleteOption = (optionId, questionId) => {

  let requestBody = { "optionID": optionId };
  console.log(requestBody);

  if(questionHasAtleastTwoOptions(questionId)){
  if (optionCanBeCleared(optionId,questionId) ) {
    deleteQuestionOption(requestBody, questionId);
  }
  else{
    let message = {"error": "Delete not allowed  -  correct answer cannot be deleted"};
    showMessageAlert(`#messageDiv_${questionId}`, message);
  }
}
else{
  let message = {"error": "Delete not allowed  -  question must have at least 2 options"};
  showMessageAlert(`#messageDiv_${questionId}`, message);

}

  // await getQuestions();
}

function questionHasAtleastTwoOptions(questionId){
  var questionOptions = document.querySelectorAll(`[name="optionFor_${questionId}"]`);
  
  return questionOptions.length > 2;
 
}

function optionCanBeCleared(id,questionId) {

  //If user tries to delete the right answer then dont allow delete
  if(document.querySelector(`#option_${id}`).checked){
    return false;
  }

  //otherwise remove the option
  document.querySelector(`#option_div_${id}`).remove();
  return true;

}


function addNewOption(questionId){

  var questionOptions = document.querySelector(`#buttons_${questionId}`);

  console.log(questionOptions);

}

function showMessageAlert( insertDivPosition, messageContent) {


  if (messageContent["message"]) {

    document.querySelector(insertDivPosition).innerHTML += `<div class="alert alert-success mt-2" role="alert">${messageContent["message"]}</div> `;

  }
  else {

    document.querySelector(insertDivPosition).innerHTML += `<div class="alert alert-danger mt-2" role="alert">${messageContent["error"]}</div> `;

  }


  //Clear the alert message
  setTimeout(function(){
    document.querySelector(insertDivPosition).innerHTML = "";
  }, 3000);


}


function deleteQuestionOption(optionObject, questionId) {

  return fetch(`${API_URI}/option`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(optionObject)
  })
    .then(response => {
      //console.log(response.json());
      return response.json();
    })
    .then(res => {
      // return res;
      console.log(res);

      showMessageAlert(`#messageDiv_${questionId}`, res);


      //  displayMessage(res);
    })
    .catch(err => console.log(err))

}

let displayMessage = (message) => {

  console.log(message);
}





