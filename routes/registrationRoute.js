const router = require('express').Router()
const {userRegistrationForm} = require('../controllers/registrationController.js')


router.get('/signup', userRegistrationForm)

module.exports = router