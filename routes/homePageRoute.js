const router = require('express').Router()
const homePage = require('../controllers/homePageController.js')

module.exports = router.get('/', homePage)