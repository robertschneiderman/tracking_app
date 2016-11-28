const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const Schema = mongoose.Schema;
bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  name: String,
  password: String,
  tasks: [
    {
      name: String,
      description: String,
      goals: {
        type: { type: String },
        interval: String,
        daily: { count: Number, goal: Number },
        weekly: { count: Number, goal: Number },
        monthly: { count: Number, goal: Number },
        count: { type: Number, default: 0 },      
        streak: { type: Number, default: 0 }        
      }
    }
  ],
  buddy: { type: Schema.Types.ObjectId, default: null }
});
  // tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]

userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if(err) { return next(err); }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) { return next(err); }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, true);
    // callback(null, isMatch);
  })
};

userSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  decoded = jwt.decode(token, 'lsdkflk39s0f02sdkj24');

  try {
    decoded = jwt.decode(token, 'lsdkflk39s0f02sdkj24');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded.sub,
  });
}

const modelClass = mongoose.model('user', userSchema);

module.exports = modelClass;