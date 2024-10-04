const { user } = require('../models')
const bcrypt = require('bcryptjs')

// _________Render client registration form__________
const clientRegistrationForm = (req, res) => {
  res.render('clientRegistrationFormView')
}

// _________Handling registration of client__________
const registerClient = async (req, res) => {
  const {firstName, lastName, email, password, organization} = req.body

  try{
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const existUser = await user.findOne({where:{email}})
    if(existUser){
      return res.status(400).json({msg: 'email already in use'})
    }
    const newClient = await user.create({
      firstName,
      lastName,
      email,
      organization,
      password: hashedPassword,
      role: 'client',
      isActive: true
    })

    res.redirect(301, '/login')
  } catch(error) {
      console.error('Error: ', error);
      res.status(500).json({msg: 'error during registration', error})
  }
}


// _________Render freelancer registration form__________
const freelancerRegistrationForm = (req, res) => {
  res.render('freelancerRegistrationFormView')
}

// _________Handling registration of freelancer__________
const registerFreelancer = async (req, res) => {
  const {firstName, lastName, email, password} = req.body

  try{
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const existUser = await user.findOne({where:{email}})
    if(existUser){
      return res.status(400).json({msg: 'email already in use'})
    }

    const newFreelancer = await user.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'freelancer',
      isActive: true
    })

    res.redirect(301, '/login')
  } catch(error) {
      console.error('Error: ', error);
      res.status(500).json({msg: 'error during registration', error})
  }
}

module.exports = {
  clientRegistrationForm,
  registerClient,
  freelancerRegistrationForm,
  registerFreelancer
}