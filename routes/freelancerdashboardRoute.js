const freelancerDashboard = require('../controllers/freelancerDashboardController.js')
const router = require('express').Router()

router.get('/dashboard', freelancerDashboard)

module.exports = router