const { project } = require('../models')

const clientDashboard = async (req, res) => {
  try {
    const firstName = req.session.user.firstName
    const lastName = req.session.user.lastName

  const projects = await project.findAll({where:{clientUserId:req.session.user.id}})
  res.render('clientDashboardView', { 
    firstName: firstName,
    projects: projects,
    lastName: lastName
  })
  }catch(err){
    console.error('error while fetching data', err);
    
  }
  
}

module.exports = clientDashboard