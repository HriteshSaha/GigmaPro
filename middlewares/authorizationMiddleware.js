module.exports = (allowRoles) => {
  return (req, res, next) => {
    if (allowRoles.includes(req.session.user.role)) {
      next()
    }else {
      return res.status(403).send('Access Denied');
    }
  }
}