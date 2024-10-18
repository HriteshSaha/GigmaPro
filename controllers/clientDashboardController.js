const { project, bid, user } = require('../models')

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
  res.render('clientDashboardView', { 
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName,
    projects
  })
  }catch(error){
    console.error('Error fetching client dashboard:', error);
    res.status(500).send('Server Error');
    
  }
  
}

module.exports = clientDashboard