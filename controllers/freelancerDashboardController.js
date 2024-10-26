const { project } = require('../models')

const freelancerDashboard = async (req, res) => {

  const userId = req.session.user.id

  const Projects = await project.findAll({
    where: {freelancerUserId: userId},
    order: [['createdAt', 'DESC']]
  });
  console.log(Projects);
  


  res.render('freelancerDashboardView', {
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName,
    Projects
  })
}

module.exports = freelancerDashboard