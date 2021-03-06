

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

      questionHolders.innerHTML += `<div class="questionAndOptionsHolder">

            <textarea id="question_${question.questionID}" class="col-sm-9 form-control" aria-label="With textarea">${question.questionText}
            </textarea>                     
                                      `;

      question.options.forEach((option, index) => {


        questionHolders.innerHTML += `
             <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
              <input class="form-check-input" type="radio" value="" id="option_${question.optionID[index]}" name="optionFor_${question.questionID}" 
              ${option == question.correctAnswer ? "checked" : ""}>
            </span>
            <input type="text" class="form-control" value="${option}" aria-label="Username" aria-describedby="addon-wrapping">
            <button class="btn btn-danger deleteOptionButton" id="delete_option_${question.optionID[index]}" onclick="deleteOption('${question.optionID[index]}')">X</button>
          </div>`;

      });


      questionHolders.innerHTML +=  `</div>`;

      questionHolders.innerHTML += `<div class="utilityButtons">`;

      questionHolders.innerHTML += `<button type="button" class="btn btn-danger delete" id="delete_${question.questionID}">Delete</button>&nbsp;&nbsp;`;

      questionHolders.innerHTML += `<button type="button" class="btn btn-success save" id="save_${question.questionID}">Save</button>&nbsp;&nbsp;`;

      questionHolders.innerHTML += `<button type="button" class="btn btn-info addOption" id="addOption_${question.questionID}">Add Option</button>&nbsp;&nbsp;`;

      questionHolders.innerHTML += `</div>`;

      questionHolders.innerHTML += `<hr style="height:10px;">`;

    //  console.log(question.questionText);

    });

  })
}


let deleteOption = async(optionId) => {

  let requestBody = {"optionID" :optionId};
  console.log(requestBody);


  clearData();
  deleteQuestionOption(requestBody);
  await getQuestions();
}


function clearData(){
  document.querySelector('#questions').innerHTML = "";
}

function deleteQuestionOption(optionObject) {

  return fetch(`${API_URI}/option`, {
    method: "DELETE",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(optionObject)
  })
    .then(response => {
      return response.json();
    })
    .then(res => {
     console.log(res);
     displayMessage(res);
    })
    .catch(err => console.log(err))

}

let displayMessage = (message) => {

  console.log(message);
}





