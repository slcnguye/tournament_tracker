'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.addColumn(
      'match-result',
      'lastRank',
      {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      }
    );
  },

  down: queryInterface => {
    queryInterface.removeColumn('match-result', 'lastRank');
  }
};
