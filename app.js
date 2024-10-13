const express = require("express");
const session = require('express-session')
const path = require("path");
require("dotenv").config();

const homeRoute = require('./routes/homePageRoute.js');
const clientSignupRoute = require('./routes/clientRegistrationRoute.js');
const freelancerSignupRoute = require('./routes/freelancerRegistrationRoute.js');
const loginRoute = require('./routes/loginRoute.js');
const handleLogout = require('./routes/logoutRoute.js')
const freelancerDashboardRoute = require('./routes/freelancerdashboardRoute.js');
const clientDashboardRoute = require('./routes/clientDashboardRoute.js')
const createProject = require('./routes/projectCreationRoute.js')
const bidSubmission = require('./routes/bidSubmissionRoute.js')
const projects = require('./routes/projectCardRoute.js')
const registrationDiversion = require('./routes/registrationDiversionRoute.js')
const isAuthenticated = require('./middlewares/authenticationMiddleware.js')
const { isClient, isFreelancer } = require('./middlewares/authorizationMiddleware.js')


const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }))
//configuring session
app.use(session({
  secret: 'HriteshSaha@',
  name: 'gigmaProAuthSession',
  resave: false,
  saveUninitialized: false,
  cookie: {secure: false, maxAge: 24 * 60 * 60 * 1000}
}))

app.use('/', homeRoute);
app.use('/', clientSignupRoute);
app.use('/', freelancerSignupRoute);
app.use('/', loginRoute);
app.use('/', handleLogout)
app.use('/freelancer', isAuthenticated, isFreelancer, freelancerDashboardRoute);
app.use('/freelancer', isAuthenticated, isFreelancer, bidSubmission);
app.use('/client', isAuthenticated, isClient, clientDashboardRoute);
app.use('/client', isAuthenticated, isClient, createProject);
app.use('/', isAuthenticated, projects)
app.use('/', registrationDiversion)


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
