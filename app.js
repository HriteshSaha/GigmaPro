const express = require('express')
require('dotenv').config()

const homeRoute = require('./routes/homePageRoute.js')

const app = express()
const port = process.env.PORT || 3000


app.set('view engine', 'ejs')

app.use('/', homeRoute)



app.listen(port, ()=>{
  console.log(`Server running at http://localhost:${port}`);
  
})