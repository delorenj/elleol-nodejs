var User = mongoose.model('User')

module.exports = function (app, auth) {

  app.param('profileId', function (req, res, next, id) {
    User
      .findOne({ _id : id })
      .run(function (err, user) {
        if (err) return next(err)
        if (!user) return next(new Error('Failed to load User ' + id))
        req.foundUser = user
        next()
      })
  })

  app.get('/login', function(req, res){
    res.render('users/login', { title: "ElleOL Login", user: req.user, message: req.flash('error') });
  });

  // Handles session Logout
  app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/articles')
  })

  // Profile view
  app.get('/profile/:profileId', function (req, res) {
    var user1 = req.foundUser
    res.render('users/profile', {
        title : user1.fb.name.full
      , user1 : user1
    })
  })


}
