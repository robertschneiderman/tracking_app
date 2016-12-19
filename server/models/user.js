const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const config = require('../environment');

let task = {
      name: String,
      type: { type: String },
      shortestInterval: String,
      timeUnit: Number,   
      goals: [
        {
          interval: String,
          count: Number, 
          goal: Number,
          streak: { type: Number, default: 0 },
          originalMultiplier: Number,
          lastAssessed: Date,
          nextAssessed: Date       
        }
      ]
};

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  name: String,
  password: String,
  histories: [
    { date: Date, tasks: [task] }
  ],
  buddy: { type: Schema.Types.ObjectId, default: null }
});

// userSchema.pre('save', function(next) {
//   const user = this;
//   bcrypt.genSalt(10, function(err, salt) {
//     if(err) { return next(err); }

//     bcrypt.hash(user.password, salt, null, function(err, hash) {
//       if(err) { return next(err); }

//       user.password = hash;
//       next();
//     });
//   });
// });

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

userSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  decoded = jwt.decode(token, config.secret);

  try {
    decoded = jwt.decode(token, config.secret);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded.sub,
  });
};

const modelClass = mongoose.model('user', userSchema);

module.exports = modelClass;