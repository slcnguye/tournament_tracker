'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('match-result', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    scoreDelta: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    lastScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    lastRank: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    rank: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
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
