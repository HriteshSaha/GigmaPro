const projectCreation = require('../controllers/projectCreationController.js')
const router = require('express').Router()

router.get('/create-project', projectCreation)

module.exports = router