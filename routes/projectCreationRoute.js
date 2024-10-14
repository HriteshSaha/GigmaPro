const { projectCreationForm, handleProjectCreation } = require('../controllers/projectCreationController.js')
const router = require('express').Router()

router.get('/create-project', projectCreationForm)

router.post('/create-project', handleProjectCreation)

module.exports = router