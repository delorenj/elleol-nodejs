// comment schema

var Comments = new Schema({
    body        : {type : String, default : ''}
  , card        : {type : Schema.ObjectId, ref : 'Card'}
  , user        : {type : Schema.ObjectId, ref : 'User'}
  , created_at  : {type : Date, default : Date.now}
})

mongoose.model('Comment', Comments)
