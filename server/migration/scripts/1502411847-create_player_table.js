'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable(
      'player', {
        _id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING,
          unique: {
            msg: 'The specified name is already in use.'
          },
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        createdAt: {
          type: DataTypes.DATE
        },
        updatedAt: {
          type: DataTypes.DATE
        }
      });
  },

  down: (queryInterface) => {
    queryInterface.dropTable('player');
  }
};
