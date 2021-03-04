let express = require('express');
let dotenv = require('dotenv');
dotenv.config();


const quizApp = express();

const PORT = process.env.PORT;


quizApp.listen(PORT, ()=>{
  console.log(`Express app running on Node.js server at PORT ${PORT}`);
});