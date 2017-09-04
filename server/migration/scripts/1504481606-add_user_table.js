'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable(
      'user', {
        _id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING
        },
        firstName: {
          type: DataTypes.STRING
        },
        lastName: {
          type: DataTypes.STRING
        },
        picture: {
          type: DataTypes.STRING
        },
        google: {
          type: DataTypes.STRING
        },
        facebook: {
          type: DataTypes.STRING
        },
        link: {
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
    queryInterface.dropTable('user');
  }
};
