'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('user', {
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
    }
  }, {
    timestamps: true,
    freezeTableName: true
  });
}
