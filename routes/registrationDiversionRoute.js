const registrationDiversion = require('../controllers/registrationDiversionController')
const router = require('express').Router()

router.get('/signup-as-role', registrationDiversion)

module.exports = router