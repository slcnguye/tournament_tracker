'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('match', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
