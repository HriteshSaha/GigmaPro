const { user, project, bid, contract } = require('../models')

const freelancerDashboard = async (req, res) => {
  try {
    const userId = req.session.user.id

    const Bids = await bid.findAll({
      where: {userId: userId},
      include: {
        model: project,
        as: 'project',
        attributes: ['title', 'status']
      },
      order: [['createdAt', 'DESC']]
    });

    const Contracts = await contract.findAll({
      where: {freelancerUserId: userId},
      include: [
        {
          model: project,
          as: 'project',
          include: [
            {
              model: user,
              as: 'client',
              attributes: ['firstName', 'lastName']
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    })

    const activeContracts = Contracts.filter(c => c.status === 'active').length
    const contractValue = Contracts.reduce((total, c) => total + Number(c.budget || 0), 0)

    res.render('freelancerDashboardView', {
      firstName: req.session.user.firstName,
      lastName: req.session.user.lastName,
      Bids,
      Contracts,
      stats: {
        totalBids: Bids.length,
        activeContracts,
        contractValue
      }
    })
  } catch (error) {
    console.error('Error fetching freelancer dashboard:', error);
    res.status(500).send('Server Error');
  }
}

module.exports = freelancerDashboard
