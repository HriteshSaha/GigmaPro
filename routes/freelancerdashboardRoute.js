const freelancerDashboard = require('../controllers/freelancerDashboardController.js')
const router = require('express').Router()

router.get('/dashboard-user-freelancer', freelancerDashboard)

module.exports = router