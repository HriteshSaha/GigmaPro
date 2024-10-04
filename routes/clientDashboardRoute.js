const clientDashboard = require('../controllers/clientDashboardController.js')
const router = require('express').Router()

router.get('/dashboard-user-client', clientDashboard)

module.exports = router