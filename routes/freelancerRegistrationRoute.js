const router = require('express').Router()
const {freelancerRegistrationForm, registerFreelancer, registrationRules} = require('../controllers/registrationController.js')

router.get('/signup-freelancer', freelancerRegistrationForm)

router.post('/signup-freelancer', registrationRules, registerFreelancer)

module.exports = router
