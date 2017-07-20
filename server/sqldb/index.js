/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');
db.Tournament = db.sequelize.import('../api/tournament/tournament.model');
db.Player = db.sequelize.import('../api/player/player.model');
db.Match = db.sequelize.import('../api/match/match.model');
db.TournamentPlayer = db.sequelize.import('../api/tournament-player/tournament-player.model');
db.MatchResult = db.sequelize.import('../api/match-result/match-result.model');

db.Tournament.hasMany(db.Match, {as: 'Matches'});
db.Tournament.belongsToMany(db.Player, {through: db.TournamentPlayer});
db.Player.belongsToMany(db.Tournament, {through: db.TournamentPlayer});
db.Match.belongsToMany(db.TournamentPlayer, {through: db.MatchResult});
db.TournamentPlayer.belongsToMany(db.Match, {through: db.MatchResult});

module.exports = db;
