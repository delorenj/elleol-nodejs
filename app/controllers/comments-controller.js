var Card = mongoose.model('Card')
  , Comment = mongoose.model('Comment')


module.exports = function(app, auth){
  app.param('cardId', function(req, res, next, id){
    Card
      .findOne({ _id : id })
      .run(function(err,card) {
        if (err) return next(err);
        if (!card) return next(new Error('Failed to load card ' + id));
        req.article = card;
        next();
      })
  });

  app.post('/comment/:cardId', function (req, res) {
    if (req.body.comment && req.body.comment.body != '' && req.loggedIn) {
      var comment = new Comment({})
      comment.card = req.card.id
      comment.body = req.body.comment.body
      if (req.loggedIn)
        comment.user = req.session.auth.userId
      comment.save(function (err) {
        if (err) throw err
        req.flash('notice', 'Comment added successfully')
        res.redirect('/card/'+req.card.id)
      })
    }
    else
      res.redirect('/card/'+req.card.id)
  })
}
