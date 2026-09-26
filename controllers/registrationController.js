const { user } = require('../models')
const bcrypt = require('bcryptjs')

// _________Render client registration form__________
const clientRegistrationForm = (req, res) => {
  res.render('clientRegistrationFormView', {error: null})
}

// _________Handling registration of client__________
const registerClient = async (req, res) => {
  const {firstName, lastName, email, password, organization} = req.body

  try{
    const existUser = await user.findOne({where:{email}})
    if(existUser){
      return res.status(400).render('clientRegistrationFormView', {error: 'An account with this email already exists.'})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    await user.create({
      firstName,
      lastName,
      email,
      organization,
      password: hashedPassword,
      role: 'Client',
      isActive: true
    })

    res.redirect('/login')
  } catch(error) {
      console.error('Error registering client: ', error);
      res.status(500).render('clientRegistrationFormView', {error: 'Something went wrong. Please try again.'})
  }
}


// _________Render freelancer registration form__________
const freelancerRegistrationForm = (req, res) => {
  res.render('freelancerRegistrationFormView', {error: null})
}

// _________Handling registration of freelancer__________
const registerFreelancer = async (req, res) => {
  const {firstName, lastName, email, password} = req.body

  try{
    const existUser = await user.findOne({where:{email}})
    if(existUser){
      return res.status(400).render('freelancerRegistrationFormView', {error: 'An account with this email already exists.'})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    await user.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'Freelancer',
      isActive: true
    })

    res.redirect('/login')
  } catch(error) {
      console.error('Error registering freelancer: ', error);
      res.status(500).render('freelancerRegistrationFormView', {error: 'Something went wrong. Please try again.'})
  }
}

module.exports = {
  clientRegistrationForm,
  registerClient,
  freelancerRegistrationForm,
  registerFreelancer
}
