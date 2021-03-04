let express = require('express');
let dotenv = require('dotenv');
let morgan=require('morgan');
let bodyParser=require('body-parser');
let expressValidator=require('express-validator');
const cors=require('cors');

let questionRoutes = require('./routes/questionRoutes');

dotenv.config();

const quizApp = express();
const PORT = process.env.PORT;


//Middleware
//quizApp.use(bodyParser.json());
quizApp.use(expressValidator());
quizApp.use(cors());
quizApp.use("/",questionRoutes);


quizApp.listen(PORT, ()=>{
  console.log(`Express app running on Node.js server at PORT ${PORT}`);
});