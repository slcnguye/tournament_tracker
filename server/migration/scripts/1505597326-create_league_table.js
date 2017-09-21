'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable(
      'league', {
        _id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        code: {
          type: DataTypes.STRING,
          unique: {
            msg: 'The specified code is already in use.'
          },
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false
        },
        createdBy: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false
        },
        updatedBy: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      });
  },

  down: queryInterface => {
    queryInterface.dropTable('league');
  }
};
