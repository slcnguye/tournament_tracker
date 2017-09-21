'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('tournament-player-note', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tournamentPlayerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'tournament-player', key: '_id' }
    },
    message: {
      type: DataTypes.STRING
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
