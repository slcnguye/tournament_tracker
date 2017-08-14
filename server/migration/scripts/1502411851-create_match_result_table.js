'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable(
      'match-result', {
        _id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        matchId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "match", key: "_id" }
        },
        tournamentPlayerId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "tournament-player", key: "_id" }
        },
        scoreDelta: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false
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
    queryInterface.dropTable('match-result')
  }
};
