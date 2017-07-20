'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('tournament-player', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    score: DataTypes.INTEGER
  }, {
    timestamps: true
  });
}
