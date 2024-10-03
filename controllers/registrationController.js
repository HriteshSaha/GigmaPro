const { user } = require('../models')
const bcrypt = require('bcryptjs')

const userRegistrationForm = (req, res) => {
  res.render('registrationFormView')
}




module.exports = { userRegistrationForm }