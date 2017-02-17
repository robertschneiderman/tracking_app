'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Goals',
      'taskId',
      Sequelize.INTEGER
    );    
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Goals', 'taskId');
  }
};

