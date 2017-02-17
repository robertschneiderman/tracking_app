'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Timestamps',
      'taskId',
      Sequelize.INTEGER
    );    
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Timestamps', 'taskId');
  }
};

