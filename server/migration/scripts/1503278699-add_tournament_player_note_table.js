'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable(
      'tournament-player-note', {
        _id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        tournamentPlayerId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'tournament-player', key: '_id' }
        },
        message: {
          type: DataTypes.STRING
        },
        createdAt: {
          type: DataTypes.DATE
        },
        updatedAt: {
          type: DataTypes.DATE
        }
      });
  },

  down: queryInterface => {
    queryInterface.dropTable('tournament-player-note');
  }
};
