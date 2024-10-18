const { project, bid } = require('../models')

const bidSubmission = (req, res)=> {
  const projectId = req.params.projectId
  res.render('bidSubmissionFormView', {projectId})
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

    const newBid = await bid.create({
      bidAmmount: quotationAmount, // Amount spelling bhul korechi db te tai ekhane o bhul
      proposalDetails: pitch,
      submittedAt: new Date(),
      estimatedDateOfDelivery: deliveryDate,
      userId,
      projectId
    }) 

    return res.status(201).json({ message: 'Bid submitted successfully', newBid });
  } catch(err){
    console.error(err);
    return res.status(500).json({message: 'Error while placing bid'})
  }
}


module.exports = { bidSubmission, handleBidSubmission }