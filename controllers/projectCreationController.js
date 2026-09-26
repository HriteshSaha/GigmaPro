const { project, skill } = require('../models')
const { body, validationResult } = require('express-validator')
const CATEGORIES = require('../config/categories')

// rendering the project creation form
const projectCreationForm = async (req, res) => {
  const skills = await skill.findAll({ order: [['name', 'ASC']] })
  res.render('projectCreationFormView', { categories: CATEGORIES, skills, error: null, values: {} })
}

const validateProjectCreation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('budget').isFloat({ gt: 0 }).withMessage('Budget must be a positive number'),
  body('category').isIn(CATEGORIES.map(c => c.name)).withMessage('Please choose a valid category'),
  body('description').trim().notEmpty().withMessage('Description is required')
]

// handling the creation of project
const handleProjectCreation = async (req, res)=> {
  const {title, budget, category, description} = req.body
  const skillIds = [].concat(req.body.skills || []).map(Number).filter(Boolean)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const skills = await skill.findAll({ order: [['name', 'ASC']] })
    return res.status(400).render('projectCreationFormView', {
      categories: CATEGORIES,
      skills,
      error: errors.array()[0].msg,
      values: req.body
    })
  }

  try{
    const newProject = await project.create({
      title,
      budget,
      category,
      description,
      clientUserId: req.session.user.id
    })

    if (skillIds.length > 0) {
      await newProject.setSkills(skillIds)
    }

    res.redirect('/client/dashboard')
  }catch(err){
    console.error('Error creating project: ', err);
    const skills = await skill.findAll({ order: [['name', 'ASC']] })
    res.status(500).render('projectCreationFormView', {
      categories: CATEGORIES,
      skills,
      error: 'Something went wrong creating your project. Please try again.',
      values: req.body
    })
  }
}


module.exports = { projectCreationForm, handleProjectCreation, validateProjectCreation }
