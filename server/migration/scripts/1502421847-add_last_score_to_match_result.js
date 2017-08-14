'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.addColumn(
      'match-result',
      'lastScore',
      {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      }
    )
  },

  down: (queryInterface, DataTypes) => {
    queryInterface.removeColumn('match-result', 'lastScore')
  }
};
