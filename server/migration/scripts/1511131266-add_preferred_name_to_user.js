'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.addColumn(
      'user',
      'preferredName',
      {
        type: DataTypes.STRING,
        allowNull: true,
        unique: {
          msg: 'The specified name is already in use.'
        }
      }
    );

    queryInterface.sequelize.query('UPDATE `user` SET `user`.`preferredName` = `user`.`name`;');

    queryInterface.removeColumn('player', 'name');
  },
  down: queryInterface => {
    queryInterface.removeColumn('user', 'preferredName');
  }
};
