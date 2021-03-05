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
    // console.log('key ---> ',key);
    //console.log('questions[key] ---> ',questions[key])

    questions[key].forEach(question => {

      questionHolders.innerHTML += `<div class="fullQuestionHolder">
                                        <div class="card questionCard">
                                            <div class="card-body" id=question_${question.questionID}>
                                                ${question.questionText}
                                            </div>
                                        </div>
                                      `;

      question.options.forEach((option, index) => {


        questionHolders.innerHTML += `
             <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
              <input class="form-check-input" type="radio" value="" id="option_${question.optionID[index]}" name="optionFor_${question.questionID}" 
              ${option == question.correctAnswer ? "checked" : ""}>
            </span>
            <input type="text" class="form-control" value="${option}" aria-label="Username" aria-describedby="addon-wrapping">
          </div>`;

      });


      questionHolders.innerHTML +=  `</div>`;

    //  console.log(question.questionText);

    });

  })
}
