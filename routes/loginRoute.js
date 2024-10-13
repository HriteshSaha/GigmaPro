const router = require('express').Router()
const {loginForm, handleLogin} = require('../controllers/loginController')

router.get('/login', loginForm)

router.post('/login', handleLogin)



module.exports = router