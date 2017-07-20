'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('match-result', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    result: {
      type:   DataTypes.ENUM,
      values: ['W', 'L', 'D'],
      allowNull: false
    }
  }, {
    timestamps: true
    });
}
