const { user } = require('../models')
const bcrypt = require('bcryptjs')

const loginForm = (req, res)=> {
  res.render('loginFormView', {error: null})
}

const handleLogin = async (req, res)=>{
  const {email, password} = req.body
  try {

    if (!email || !password) {
      return res.status(400).render('loginFormView', {error: 'Wrong email or password'})
    }

    //checking if user exist or not.
    const isUser = await user.findOne({where:{email}})
    if (!isUser){
      return res.status(400).render('loginFormView', {error: 'Wrong email or password'})
    }

    // check if the password is correct or not
    const checkPassowrd = await bcrypt.compare(password, isUser.password)
    if (!checkPassowrd) {
      return res.status(400).render('loginFormView', {error: 'Wrong email or password'})
    }

    // adding session
    req.session.user = {
      id: isUser.id,
      firstName: isUser.firstName,
      lastName: isUser.lastName,
      email: isUser.email,
      role: isUser.role
    }
    

    // Redirectring client and freelancer to there respective dashboard
    if(isUser.role === 'Client'){
      return res.redirect('/client/dashboard')
    }
    if(isUser.role === 'Freelancer'){
      return res.redirect('/freelancer/dashboard')
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).render('loginFormView', {error: 'Something went wrong. Please try again.'})
  }


}

module.exports = {  
  loginForm,
  handleLogin
}