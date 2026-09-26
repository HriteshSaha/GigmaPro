const { project, bid, user, contract } = require('../models')

const clientDashboard = async (req, res) => {
  try {
    const clientId = req.session.user.id

  const projects = await project.findAll({
    where:{clientUserId: clientId},
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: bid,
        as: 'projectBids',
        include: [
          {
            model: user,
            as: 'freelancer',
            attributes: ['firstName', 'lastName']
          }
        ]
      }
    ]
  });

  const activeContracts = await contract.count({ where: { clientUserId: clientId, status: 'active' } })
  const bidsReceived = projects.reduce((total, p) => total + (p.projectBids ? p.projectBids.length : 0), 0)
  const openProjects = projects.filter(p => p.status === 'open').length

  res.render('clientDashboardView', {
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName,
    projects,
    stats: {
      totalProjects: projects.length,
      openProjects,
      bidsReceived,
      activeContracts
    }
  })
  }catch(error){
    console.error('Error fetching client dashboard:', error);
    res.status(500).send('Server Error');

  }

}

module.exports = clientDashboard
