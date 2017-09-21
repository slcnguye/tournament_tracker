'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.addColumn(
      'player',
      'leagueId',
      {
        type: DataTypes.INTEGER,
        references: { model: 'league', key: '_id' },
        allowNull: false
      }
    );
  },

  down: queryInterface => {
    queryInterface.removeColumn('player', 'leagueId');
  }
};
