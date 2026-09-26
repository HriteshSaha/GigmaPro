const { project, skill } = require('../models')

const projectCards = async (req, res)=> {
  try{
    const page = parseInt(req.query.page) || 1

    const limit = 9

    const offset = (page - 1) * limit

    const { rows: allProjects, count } = await project.findAndCountAll({
      where: { status: 'open' },
      order: [['createdAt', 'DESC']],
      limit: limit,
      offset: offset,
      include: [{ model: skill, as: 'skills', attributes: ['name'] }]
    })

    const totalPages = Math.ceil(count / limit)

    const dashboardUrl = req.session.user.role === 'Client' ? '/client/dashboard' : '/freelancer/dashboard'

    res.render('projectCardView', {
      allProject: allProjects,
      currentPage: page,
      totalPages: totalPages,
      dashboardUrl
    })
  } catch(err) {
    console.error("Error while fetching paginated projects", err);
    res.status(500).send("Server Error");
  }
}


module.exports = projectCards
