const clientDashboard = require('../controllers/clientDashboardController.js')
const router = require('express').Router()

router.get('/dashboard', clientDashboard)

module.exports = router