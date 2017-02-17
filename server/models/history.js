'use strict';
module.exports = function(sequelize, DataTypes) {
  var History = sequelize.define('History', {
    userId: DataTypes.INTEGER,    
    date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return History;
};