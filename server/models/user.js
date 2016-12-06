const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  name: String,
  password: String,
  tasks: [
    {
      name: String,
      type: { type: String },
      interval: String,
      streak: { type: Number, default: 0 },
      timeUnit: Number,   
      goals: {
        daily: { 
          count: { type: Number }, 
          goal: Number,
          assessed: {last: {type: Date }, next: {type: Date } },
          originalMultiplier: Number
        },
        weekly: { 
          count: { type: Number }, 
          goal: Number,
          assessed: {last: {type: Date }, next: {type: Date } },
          originalMultiplier: Number          
        },      
        monthly: { 
          count: { type: Number }, 
          goal: Number,
          assessed: {last: {type: Date }, next: {type: Date } },
          originalMultiplier: Number          
        }              
      },
      stubs: [
        { start: Date, end: Date }
      ]
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
  });
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
};

const modelClass = mongoose.model('user', userSchema);

module.exports = modelClass;