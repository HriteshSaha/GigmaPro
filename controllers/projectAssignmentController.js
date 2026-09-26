const { project, contract, bid, user } = require('../models')

module.exports = async (req, res, next) => {
  const { projectId, freelancerId } = req.body;

  try {
      // Find the project and freelancer
      const Project = await project.findByPk(projectId);
      const freelancer = await user.findByPk(freelancerId);

      if (!Project || !freelancer) {
          return res.status(404).send('Project or Freelancer not found');
      }

      const Bid = await bid.findOne({where:{projectId : Project.id, userId: freelancer.id}})
      if (!Bid) {
          return res.status(404).send('No bid found for this freelancer on this project');
      }

      // Create a contract between the client and freelancer
      await contract.create({
          startDate: new Date(),
          endDate: Bid.estimatedDateOfDelivery,
          budget: Bid.bidAmmount,
          projectId: Project.id,
          freelancerUserId: freelancer.id,
          clientUserId: req.session.user.id
      });

      // Update project status to 'closed'
      await Project.update({ status: 'closed' });

      res.redirect('/client/dashboard');
  } catch (error) {
      console.error(error);
      next(error);
  }
};