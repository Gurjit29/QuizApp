const API_URI = 'http://localhost:3000/questions';

//GET request for getting questions from the Database using API
export let getQuestions = async() => {

  let response = await fetch(API_URI,{
    method:"GET"
  });

  let data = await response.json();
  return data;
}

// PUT request to save the question
export let updateQuestion = async(questionData) => {

  let response = await fetch(API_URI, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(questionData)
  }). catch(err => console.log(err));

  let message = await response.json();
  return message;

}


// DELETE request to delete an option
export let deleteQuestionOption = async(optionObject) => {

  let response = await fetch(`${API_URI}/option`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(optionObject)
  });

  let message = await response.json();
  return message;

}



