const { project } = require('../models')

// rendering the project creation form
const projectCreationForm = (req, res)=> {
  res.render('projectCreationFormView')
}

// handling the creation of project
const handleProjectCreation = async (req, res)=> {
  const {title, budget, category, description} = req.body

  try{
    await project.create({
    title,
    budget,
    category,
    description,
    clientUserId: req.session.user.id
  })
  res.redirect(301, '/client/dashboard')
  }catch(err){
    console.error('Error: ', err);
    res.status(500).json({msg: 'error during project creation', err})
  }
}


module.exports = { projectCreationForm, handleProjectCreation}