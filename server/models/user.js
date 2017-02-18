const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const config = require('../environment');

'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.History, {
          foreignKey: 'userId',
          as: 'histories'
        });
      },
      findByToken: function(token) {
        var User = this;
        var decoded;

        decoded = jwt.decode(token, config.secret);
        try {
          decoded = jwt.decode(token, config.secret);
        } catch (e) {
          return Promise.reject();
        }

        return User.findOne({
          where: {
            id: decoded.sub,
          }          
        }); 
      }     
    },
    instanceMethods: {
      comparePasswords: (candidatePassword, password, callback) => {
        if (bcrypt.compareSync(candidatePassword, password)) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      }
    }
  });
  return User;
};