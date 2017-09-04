'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.addColumn(
      'match',
      'createdBy',
      {
        type: DataTypes.INTEGER,
        defaultValue: -1,
        allowNull: false
      }
    );
    queryInterface.addColumn(
      'match',
      'updatedBy',
      {
        type: DataTypes.INTEGER,
        defaultValue: -1,
        allowNull: false
      }
    );
    queryInterface.addColumn(
      'match-result',
      'createdBy',
      {
        type: DataTypes.INTEGER,
        defaultValue: -1,
        allowNull: false
      }
    );
    queryInterface.addColumn(
      'match-result',
      'updatedBy',
      {
        type: DataTypes.INTEGER,
        defaultValue: -1,
        allowNull: false
      }
    );
    queryInterface.addColumn(
      'player',
      'createdBy',
      {
        type: DataTypes.INTEGER,
        defaultValue: -1,
        allowNull: false
      }
    );
    queryInterface.addColumn(
      'player',
      'updatedBy',
      {
        type: DataTypes.INTEGER,
        defaultValue: -1,
        allowNull: false
      }
    );
    queryInterface.addColumn(
      'tournament',
      'createdBy',
      {
        type: DataTypes.INTEGER,
        defaultValue: -1,
        allowNull: false
      }
    );
    queryInterface.addColumn(
      'tournament',
      'updatedBy',
      {
        type: DataTypes.INTEGER,
        defaultValue: -1,
        allowNull: false
      }
    );
    queryInterface.addColumn(
      'tournament-player',
      'createdBy',
      {
        type: DataTypes.INTEGER,
        defaultValue: -1,
        allowNull: false
      }
    );
    queryInterface.addColumn(
      'tournament-player',
      'updatedBy',
      {
        type: DataTypes.INTEGER,
        defaultValue: -1,
        allowNull: false
      }
    );
    queryInterface.addColumn(
      'tournament-player-note',
      'createdBy',
      {
        type: DataTypes.INTEGER,
        defaultValue: -1,
        allowNull: false
      }
    );
    queryInterface.addColumn(
      'tournament-player-note',
      'updatedBy',
      {
        type: DataTypes.INTEGER,
        defaultValue: -1,
        allowNull: false
      }
    );
  },

  down: queryInterface => {
    queryInterface.removeColumn('match', 'createdBy');
    queryInterface.removeColumn('match', 'updatedBy');
    queryInterface.removeColumn('match-result', 'createdBy');
    queryInterface.removeColumn('match-result', 'updatedBy');
    queryInterface.removeColumn('player', 'createdBy');
    queryInterface.removeColumn('player', 'updatedBy');
    queryInterface.removeColumn('tournament', 'createdBy');
    queryInterface.removeColumn('tournament', 'updatedBy');
    queryInterface.removeColumn('tournament-player', 'createdBy');
    queryInterface.removeColumn('tournament-player', 'updatedBy');
    queryInterface.removeColumn('tournament-player-note', 'createdBy');
    queryInterface.removeColumn('tournament-player-note', 'updatedBy');
  }
};
