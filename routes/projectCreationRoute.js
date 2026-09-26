const { projectCreationForm, handleProjectCreation, validateProjectCreation } = require('../controllers/projectCreationController.js')
const router = require('express').Router()

router.get('/create-project', projectCreationForm)

router.post('/create-project', validateProjectCreation, handleProjectCreation)

module.exports = router
