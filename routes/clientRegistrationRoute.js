const router = require('express').Router()
const {clientRegistrationForm, registerClient, registrationRules} = require('../controllers/registrationController.js')

router.get('/signup-client', clientRegistrationForm)

router.post('/signup-client', registrationRules, registerClient)

module.exports = router
