'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable(
      'match', {
        _id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        tournamentId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'tournament', key: '_id' }
        },
        createdAt: {
          type: DataTypes.DATE
        },
        updatedAt: {
          type: DataTypes.DATE
        }
      });
  },

  down: (queryInterface, DataTypes) => {
    queryInterface.dropTable('match');
  }
};
