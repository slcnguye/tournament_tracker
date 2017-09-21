'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('tournament-player', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    leagueId: {
      type: DataTypes.INTEGER,
      references: { model: 'league', key: '_id' },
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
