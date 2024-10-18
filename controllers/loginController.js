const { user } = require('../models')
const bcrypt = require('bcryptjs')

const loginForm = (req, res)=> {
  res.render('loginFormView')
}

const handleLogin = async (req, res)=>{
  const {email, password} = req.body
  try {

    //checking if user exist or not.
    const isUser = await user.findOne({where:{email}})
    if (!isUser){
      return res.status(400).json({message:'Wrong username or password'})
    }

    // check if the password is correct or not
    const checkPassowrd = await bcrypt.compare(password, isUser.password)
    if (!checkPassowrd) {
      return res.status(400).json({message:'Wrong username or password'})
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
    // res.status(500).json({ message: 'Error logging in', error });
    console.error('Error logging in:', error);  // Logs full error details
    return res.status(500).json({
      message: 'Error logging in',
      error: error.message || 'Unknown error',  // Logs the error message
    });
  }


}

module.exports = {  
  loginForm,
  handleLogin
}