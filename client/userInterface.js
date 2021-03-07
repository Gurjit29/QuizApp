//Create main questionText
export let createQuestion = (questionID, questionText) => {

  return `<div id="messageDiv_${questionID}"></div>
  <textarea id="question_${questionID}" class="col-sm-9 form-control" aria-label="With textarea">${questionText} </textarea>`;
}


//create option for question
export let createOption = (optionID, questionID, correctAnswer, option) => {

  return `<div class="input-group flex-nowrap" id="option_div_${optionID}">
                      <span class="input-group-text" id="addon-wrapping">
                    <input class="form-check-input" type="radio" value="" id="option_${optionID}" name="optionFor_${questionID}" 
                    ${option == correctAnswer ? "checked" : ""}>
                  </span>
                  <input type="text" class="form-control" value="${option}" id="text_${optionID}" aria-label="Username" aria-describedby="addon-wrapping">
                  <button class="btn btn-danger deleteOptionButton" id="delete_option_${optionID}" 
                  onclick="deleteOption('${optionID}','${questionID}','${correctAnswer}')"><img src="../images/trash.svg"/></button>
                </div>`;
}


 //create utilityButtons
export let createButtonsDiv = (questionID, parentElement) => {

  const buttonsDiv = document.createElement("div");

  buttonsDiv.className = "utilityButtons";
  buttonsDiv.id = `questions_${questionID}`;

  buttonsDiv.innerHTML += createButton("danger", "delete", "Delete Question","deleteQuestion", questionID);

 

  buttonsDiv.innerHTML += createButton("success", "save", "Save Question","saveQuestion", questionID);

  // buttonsDiv.innerHTML += createButtons("info", "addOption", "Add Option", questionID);

  parentElement.appendChild(buttonsDiv);


  //document.querySelector(`#addOption_${questionID}`).addEventListener('click', addOption(`${questionID}`));

}

//Generic function for creating buttons
export let createButton = (buttonClassName, type, buttonText,clickListener, id) => {

  return `<button type="button" class="btn btn-${buttonClassName}" id="${type}_${id}" onclick="${clickListener}('${id}')" >
  ${buttonText}</button>&nbsp;&nbsp;`;

}


export let showMessageAlert = ( insertDivPosition, messageContent) =>  {


  if (messageContent["message"]) {

    document.querySelector(insertDivPosition).innerHTML += `<div class="alert alert-success mt-2" role="alert">${messageContent["message"]}</div> `;

  }
  else {

    document.querySelector(insertDivPosition).innerHTML += `<div class="alert alert-danger mt-2" role="alert">${messageContent["error"]}</div> `;

  }


  //Clear the alert message
  setTimeout(function(){
    document.querySelector(insertDivPosition).innerHTML = "";
  }, 2000);


}

export let questionHasAtleastTwoOptions = (questionId) => {
  var questionOptions = document.querySelectorAll(`[name="optionFor_${questionId}"]`);
  
  return questionOptions.length > 2;
 
}


export let optionCanBeCleared = (id,correctAnswer) => {


  //If user tries to delete the right answer then dont allow delete
  if(document.querySelector(`#text_${id}`).value == correctAnswer){
    return false;
  }

  //otherwise remove the option
  document.querySelector(`#option_div_${id}`).remove();
  return true;

}









