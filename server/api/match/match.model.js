'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('match', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    timestamps: true,
    freezeTableName: true
  });
}
