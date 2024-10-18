const { bidSubmission, handleBidSubmission } = require('../controllers/bidSubmissionController.js')
const router = require('express').Router()

router.get('/bid-submission/:projectId', bidSubmission)

router.post('/bid-submission', handleBidSubmission)

module.exports = router