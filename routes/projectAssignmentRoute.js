const projectAssignment = require('../controllers/projectAssignmentController.js')
const router = require('express').Router()

router.post('/assign-work', projectAssignment)


module.exports = router