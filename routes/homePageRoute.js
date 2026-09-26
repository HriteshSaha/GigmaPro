const router = require('express').Router()
const { homePage, handleContact } = require('../controllers/homePageController.js')

router.get('/', homePage)
router.post('/contact', handleContact)

module.exports = router
