const handleLogout = require('../controllers/logoutController.js')
const router = require('express').Router()

router.get('/logout', handleLogout)

module.exports = router