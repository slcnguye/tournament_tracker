'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('player', {
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
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: true,
    freezeTableName: true
  });
}
