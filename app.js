const express = require('express')
const path = require('path')
require('dotenv').config()

const homeRoute = require('./routes/homePageRoute.js')
const signupRoute = require('./routes/registrationRoute.js')
const loginRoute = require('./routes/loginRoute.js')

const app = express()
const port = process.env.PORT || 3000


app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRoute)
app.use('/', signupRoute)
app.use('/', loginRoute)



app.listen(port, ()=>{
  console.log(`Server running at http://localhost:${port}`);
  
})