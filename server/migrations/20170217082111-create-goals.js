'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Goals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      interval: {
        type: Sequelize.STRING
      },
      count: {
        type: Sequelize.INTEGER
      },
      goal: {
        type: Sequelize.INTEGER
      },
      streak: {
        type: Sequelize.INTEGER,
        default: 0
      },
      multiplier: {
        type: Sequelize.FLOAT        
      },
      lastAssessed: {
        type: Sequelize.DATE        
      },
      nextAssessed: {
        type: Sequelize.DATE        
      },           
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Goals');
  }
};