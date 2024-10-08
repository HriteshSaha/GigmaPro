const projectCard = require('../controllers/projectCardController.js')
const router = require('express').Router()

router.get('/projects', projectCard)

module.exports = router