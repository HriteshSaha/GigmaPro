const bidSubmission = require('../controllers/bidSubmissionController.js')
const router = require('express').Router()

router.get('/bid-submission', bidSubmission)

module.exports = router