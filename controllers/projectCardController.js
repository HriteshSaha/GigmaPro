const { project } = require('../models')

const projectCards = async (req, res)=> {
  try{
    const allProject = await project.findAll()
    res. render('projectCardView', {allProject: allProject})
  } catch(err) {
    console.error("error while printing all projects", err);
  }
}


module.exports = projectCards