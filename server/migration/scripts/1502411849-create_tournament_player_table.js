'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable(
      'tournament-player', {
        _id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        score: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false
        },
        playerId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "player", key: "_id" }
        },
        tournamentId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "tournament", key: "_id" }
        },
        createdAt: {
          type: DataTypes.DATE
        },
        updatedAt: {
          type: DataTypes.DATE
        }
      })
  },

  down: (queryInterface, DataTypes) => {
    queryInterface.dropTable('tournament-player')
  }
};
