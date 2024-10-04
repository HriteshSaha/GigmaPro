const router = require('express').Router()
const {clientRegistrationForm, registerClient} = require('../controllers/registrationController.js')

router.get('/signup-client', clientRegistrationForm)

router.post('/signup-client', registerClient)

module.exports = router