'use strict';
module.exports = function(sequelize, DataTypes) {
  var Timestamps = sequelize.define('Timestamps', {
    taskId: DataTypes.INTEGER,    
    start: DataTypes.DATE,
    end: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Timestamps;
};