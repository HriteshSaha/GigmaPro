const { project, bid, user, skill } = require('../models')

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

  res.render('bidSubmissionFormView', { project: foundProject })
}

const handleBidSubmission = async (req, res) => {
  try{
    const {quotationAmount, deliveryDate, pitch, projectId} = req.body
    const userId = req.session.user.id
    const foundProject = await project.findByPk(projectId)

    if(!foundProject){
      return res.status(404).json({ message: 'Project not found' });
    }

    if (foundProject.status === 'closed'){
      return res.status(403).json({message:'This project is already been assigned'})
    }

    await bid.create({
      bidAmmount: quotationAmount,
      proposalDetails: pitch,
      submittedAt: new Date(),
      estimatedDateOfDelivery: deliveryDate,
      userId,
      projectId
    })

    return res.redirect('/freelancer/dashboard');
  } catch(err){
    console.error(err);
    return res.status(500).json({message: 'Error while placing bid'})
  }
}


module.exports = { bidSubmission, handleBidSubmission }
