const express = require("express");
const session = require('express-session')
const path = require("path");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
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
const isAuthorized = require('./middlewares/authorizationMiddleware.js')
const projectAssignment = require('./routes/projectAssignmentRoute.js')


const app = express();
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
  // Trust the platform's reverse proxy (Railway/Render/etc.) so secure cookies work
  app.set('trust proxy', 1);
}

app.set("view engine", "ejs");
app.use(helmet({
  // This app relies on inline <style>/<script> blocks and several third-party CDNs
  // that a default CSP would block, so it's left to platform-level headers instead.
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }))
//configuring session
app.use(session({
  secret: process.env.SESSION_SECRET,
  name: 'gigmaProAuthSession',
  resave: false,
  saveUninitialized: false,
  cookie: {secure: process.env.NODE_ENV === 'production', maxAge: 24 * 60 * 60 * 1000}
}))

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'test' ? 1000 : 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many attempts, please try again later.' }
})

app.post('/login', authLimiter)
app.post('/signup-client', authLimiter)
app.post('/signup-freelancer', authLimiter)

app.use('/', homeRoute);
app.use('/', clientSignupRoute);
app.use('/', freelancerSignupRoute);
app.use('/', loginRoute);
app.use('/', handleLogout)
app.use('/', registrationDiversion)
app.use('/', projects)
app.use('/freelancer', isAuthenticated, isAuthorized(['Freelancer']), freelancerDashboardRoute);
app.use('/freelancer', isAuthenticated, isAuthorized(['Freelancer']), bidSubmission);
app.use('/client', isAuthenticated, isAuthorized(['Client']), clientDashboardRoute);
app.use('/client', isAuthenticated, isAuthorized(['Client']), createProject);
app.use('/client', isAuthenticated, isAuthorized(['Client']), projectAssignment);

app.use((req, res) => {
  res.status(404).render('error', {
    statusCode: 404,
    title: 'Page not found',
    message: "The page you're looking for doesn't exist or may have been moved."
  })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).render('error', {
    statusCode: 500,
    title: 'Something went wrong',
    message: 'An unexpected error occurred. Please try again in a moment.'
  })
})

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

module.exports = app;
