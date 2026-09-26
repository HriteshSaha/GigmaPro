const { bidSubmission, handleBidSubmission, validateBidSubmission } = require('../controllers/bidSubmissionController.js')
const router = require('express').Router()

router.get('/bid-submission/:projectId', bidSubmission)

router.post('/bid-submission', validateBidSubmission, handleBidSubmission)

module.exports = router
