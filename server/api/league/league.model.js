'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('league', {
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
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    timestamps: true,
    freezeTableName: true
  });
}
