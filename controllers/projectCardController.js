const { project } = require('../models')

const projectCards = async (req, res)=> {
  try{
    const page = parseInt(req.query.page) || 1

    const limit = 10

    const offset = (page - 1) * limit

    const { rows: allProjects, count } = await project.findAndCountAll({
      limit: limit,
      offset: offset
    })

    const totalPages = Math.ceil(count / limit)

    res. render('projectCardView', {
      allProject: allProjects,
      currentPage: page,
      totalPages: totalPages
    })
  } catch(err) {
    console.error("Error while fetching paginated projects", err);
    res.status(500).send("Server Error");
  }
}


module.exports = projectCards