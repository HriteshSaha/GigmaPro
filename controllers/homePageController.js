const { project, user } = require('../models')

const CATEGORIES = [
  { name: 'Web Development', icon: 'bi-code-slash' },
  { name: 'UI/UX Design', icon: 'bi-palette' },
  { name: 'Graphic Design', icon: 'bi-brush' },
  { name: 'Digital Marketing', icon: 'bi-megaphone' },
  { name: 'Content Writing', icon: 'bi-pencil-square' },
  { name: 'Mobile Development', icon: 'bi-phone' }
]

const homePage = async (req, res) => {
  try {
    const featuredProjects = await project.findAll({
      where: { status: 'open' },
      order: [['createdAt', 'DESC']],
      limit: 3,
      include: [{ model: user, as: 'client', attributes: ['firstName', 'organization'] }]
    })

    res.render('homePage', {
      featuredProjects,
      categories: CATEGORIES,
      contactSent: req.query.contactSent === '1'
    })
  } catch (error) {
    console.error('Error loading home page:', error)
    res.render('homePage', { featuredProjects: [], categories: CATEGORIES, contactSent: false })
  }
}

const handleContact = (req, res) => {
  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.redirect('/#contact')
  }

  // No email/ticketing integration yet — log server-side so submissions aren't silently lost.
  console.log(`New contact message from ${name} <${email}>: ${subject}\n${message}`)

  res.redirect('/?contactSent=1#contact')
}

module.exports = { homePage, handleContact }
