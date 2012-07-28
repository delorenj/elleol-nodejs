
/*
 *  Generic require login routing middleware
 */

exports.requiresLogin = function (req, res, next) {
  if (!req.loggedIn) {
    req.flash('notice', 'You are not authorized. Please login')
    res.redirect('/')
  }
  next()
};


/*
 *  User authorizations routing middleware
 */

exports.user = {
    hasAuthorization : function (req, res, next) {
      if (req.foundUser.id != req.session.auth.userId) {
        req.flash('notice', 'You are not authorized')
        res.redirect('/profile/'+req.foundUser.id)
      }
      next()
    }
}


/*
 *  Card authorizations routing middleware
 */

exports.card = {
    hasAuthorization : function (req, res, next) {
      // if (req.article.user._id.toString() != req.user._id.toString()) {
      //   req.flash('notice', 'You are not authorized');
      //   res.redirect('/article/'+req.article.id);
      // }
      next()
    }
}
