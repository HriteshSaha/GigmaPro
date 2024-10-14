const { project } = require('../models')

const clientDashboard = async (req, res) => {
  try {
    const userName = req.session.user.firstName

  const projects = await project.findAll({where:{clientUserId:req.session.user.id}})
  res.render('clientDashboardView', { userName: userName, projects: projects })
  }catch(err){
    console.error('error while fetching data', err);
    
  }
  
}

module.exports = clientDashboard