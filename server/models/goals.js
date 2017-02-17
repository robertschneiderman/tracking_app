'use strict';
module.exports = function(sequelize, DataTypes) {
  var Goals = sequelize.define('Goals', {
    taskId: DataTypes.INTEGER,    
    interval: DataTypes.STRING,
    count: DataTypes.INTEGER,
    goal: DataTypes.INTEGER,
    streak: { type: DataTypes.INTEGER, default: 0 },
    multiplier: DataTypes.INTEGER,
    lastAssessed: DataTypes.DATE,
    nextAssessed: DataTypes.DATE,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Goals;
};