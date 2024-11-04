const { user, project, bid, contract } = require('../models')

const freelancerDashboard = async (req, res) => {

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

  console.log(JSON.stringify(Contracts, null, 2));
  res.render('freelancerDashboardView', {
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName,
    Bids,
    Contracts
  })
}

module.exports = freelancerDashboard