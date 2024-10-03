const router = require('express').Router()
const {loginForm} = require('../controllers/loginController')

router.get('/login', loginForm)



module.exports = router