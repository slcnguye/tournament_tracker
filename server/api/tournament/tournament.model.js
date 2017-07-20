'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('tournament', {
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
    scoreType: {
      type: DataTypes.ENUM,
      values: ['3PW', 'ELO'],
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {
    timestamps: true
  });
}
