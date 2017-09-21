'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.addColumn(
      'match',
      'leagueId',
      {
        type: DataTypes.INTEGER,
        references: { model: 'league', key: '_id' },
        allowNull: false
      }
    );
    queryInterface.addColumn(
      'match-result',
      'leagueId',
      {
        type: DataTypes.INTEGER,
        references: { model: 'league', key: '_id' },
        allowNull: false
      }
    );
    queryInterface.addColumn(
      'tournament-player',
      'leagueId',
      {
        type: DataTypes.INTEGER,
        references: { model: 'league', key: '_id' },
        allowNull: false
      }
    );
    queryInterface.addColumn(
      'tournament-player-note',
      'leagueId',
      {
        type: DataTypes.INTEGER,
        references: { model: 'league', key: '_id' },
        allowNull: false
      }
    );
  },

  down: queryInterface => {
    queryInterface.removeColumn('match', 'leagueId');
    queryInterface.removeColumn('match-result', 'leagueId');
    queryInterface.removeColumn('tournament-player', 'leagueId');
    queryInterface.removeColumn('tournament-player-note', 'leagueId');
  }
};
