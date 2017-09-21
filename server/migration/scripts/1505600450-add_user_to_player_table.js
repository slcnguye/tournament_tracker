'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.addColumn(
      'player',
      'userId',
      {
        type: DataTypes.INTEGER,
        references: { model: 'user', key: '_id' },
        allowNull: false
      }
    );
  },

  down: queryInterface => {
    queryInterface.removeColumn('player', 'userId');
  }
};
