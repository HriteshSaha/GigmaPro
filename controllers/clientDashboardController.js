const clientDashboard = (req, res) => {
  const userName = req.session.user.firstName
  res.render('clientDashboardView', { userName: userName })
}

module.exports = clientDashboard