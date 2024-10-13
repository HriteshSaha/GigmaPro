const handleLogout = (req, res)=> {
  const previousPage = req.get('referer')

  req.session.destroy((err)=>{
    if(err){
      console.error('Error at logout', err);
      return res.redirect(previousPage || '/')
    }

    return res.redirect('/login')
  })
}

module.exports = handleLogout