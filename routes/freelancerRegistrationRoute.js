const router = require('express').Router()
const {freelancerRegistrationForm, registerFreelancer} = require('../controllers/registrationController.js')

router.get('/signup-freelancer', freelancerRegistrationForm)

router.post('/signup-freelancer', registerFreelancer)

module.exports = router