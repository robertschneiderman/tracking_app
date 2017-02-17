'use strict';
module.exports = function(sequelize, DataTypes) {
  var History = sequelize.define('History', {
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