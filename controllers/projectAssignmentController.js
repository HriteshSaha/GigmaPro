const { project, contract, bid, user } = require('../models')

module.exports = async (req, res) => {
  const { projectId, freelancerId } = req.body;

  try {
      // Find the project and freelancer
      const Project = await project.findByPk(projectId);
      const freelancer = await user.findByPk(freelancerId);
      const Bid = await bid.findOne({where:{projectId : Project.id, userId: freelancer.id}})

      if (!Project || !freelancer) {
          return res.status(404).send('Project or Freelancer not found');
      }

      // Create a contract between the client and freelancer
      const contracts = await contract.create({
          startDate: new Date(),
          endDate: Bid.estimatedDateOfDelivery,
          budget: Bid.bidAmmount,
          projectId: Project.id,
          freelancerUserId: freelancer.id,
          clientUserId: req.session.user.id
      });

      // Update project status to 'assigned'
      await Project.update({ status: 'closed' });

      res.status(200).send('Work assigned successfully');
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
};