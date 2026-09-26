const { project, bid, user, skill } = require('../models')
const { body, validationResult } = require('express-validator')

const bidSubmission = async (req, res) => {
  const projectId = req.params.projectId

  const foundProject = await project.findByPk(projectId, {
    include: [
      { model: user, as: 'client', attributes: ['firstName', 'lastName', 'organization'] },
      { model: skill, as: 'skills', attributes: ['name'] }
    ]
  })

  if (!foundProject) {
    return res.redirect('/projects')
  }

  if (foundProject.status !== 'open') {
    return res.redirect('/projects')
  }

  const existingBid = await bid.findOne({
    where: { projectId, userId: req.session.user.id }
  })

  res.render('bidSubmissionFormView', { project: foundProject, existingBid, error: null })
}

const validateBidSubmission = [
  body('quotationAmount').isFloat({ gt: 0 }).withMessage('Quotation amount must be a positive number'),
  body('deliveryDate').isISO8601().withMessage('Please choose a valid delivery date').custom((value) => {
    if (new Date(value) < new Date(new Date().toDateString())) {
      throw new Error('Delivery date cannot be in the past')
    }
    return true
  }),
  body('projectId').isInt().withMessage('Invalid project')
]

const handleBidSubmission = async (req, res) => {
  const {quotationAmount, deliveryDate, pitch, projectId} = req.body
  const userId = req.session.user.id

  try{
    const foundProject = await project.findByPk(projectId, {
      include: [
        { model: user, as: 'client', attributes: ['firstName', 'lastName', 'organization'] },
        { model: skill, as: 'skills', attributes: ['name'] }
      ]
    })

    if(!foundProject){
      return res.status(404).json({ message: 'Project not found' });
    }

    if (foundProject.status === 'closed'){
      return res.status(403).json({message:'This project is already been assigned'})
    }

    const existingBid = await bid.findOne({ where: { projectId, userId } })

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).render('bidSubmissionFormView', {
        project: foundProject,
        existingBid,
        error: errors.array()[0].msg
      })
    }

    if (existingBid) {
      await existingBid.update({
        bidAmmount: quotationAmount,
        proposalDetails: pitch,
        estimatedDateOfDelivery: deliveryDate,
        submittedAt: new Date()
      })
    } else {
      await bid.create({
        bidAmmount: quotationAmount,
        proposalDetails: pitch,
        submittedAt: new Date(),
        estimatedDateOfDelivery: deliveryDate,
        userId,
        projectId
      })
    }

    return res.redirect('/freelancer/dashboard');
  } catch(err){
    console.error(err);
    return res.status(500).json({message: 'Error while placing bid'})
  }
}


module.exports = { bidSubmission, handleBidSubmission, validateBidSubmission }
