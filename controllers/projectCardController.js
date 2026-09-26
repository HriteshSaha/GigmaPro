const { project, skill } = require('../models')
const CATEGORIES = require('../config/categories')

const projectCards = async (req, res, next)=> {
  try{
    const page = parseInt(req.query.page) || 1

    const limit = 9

    const offset = (page - 1) * limit

    const selectedCategory = CATEGORIES.some(c => c.name === req.query.category) ? req.query.category : null

    const where = { status: 'open' }
    if (selectedCategory) {
      where.category = selectedCategory
    }

    const { rows: allProjects, count } = await project.findAndCountAll({
      where,
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
      dashboardUrl,
      categories: CATEGORIES,
      selectedCategory
    })
  } catch(err) {
    console.error("Error while fetching paginated projects", err);
    next(err);
  }
}


module.exports = projectCards
