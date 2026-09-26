const projectCard = require('../controllers/projectCardController.js')
const isAuthenticated = require('../middlewares/authenticationMiddleware.js')
const router = require('express').Router()

router.get('/projects', isAuthenticated, projectCard)

module.exports = router
