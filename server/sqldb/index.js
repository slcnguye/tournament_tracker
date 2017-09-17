/**
 * Sequelize initialization module
 */

'use strict';

import config from '../config/environment';
import Sequelize from 'sequelize';

let db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.Tournament = db.sequelize.import('../api/tournament/tournament.model');
db.League = db.sequelize.import('../api/league/league.model');
db.Player = db.sequelize.import('../api/player/player.model');
db.Match = db.sequelize.import('../api/match/match.model');
db.TournamentPlayer = db.sequelize.import('../api/tournament-player/tournament-player.model');
db.TournamentPlayerNote = db.sequelize.import('../api/tournament-player-note/tournament-player-note.model');
db.MatchResult = db.sequelize.import('../api/match-result/match-result.model');
db.User = db.sequelize.import('../api/user/user.model');

db.User.hasMany(db.Player, {as: 'players'});
db.League.hasMany(db.Player, {as: 'players'});
db.Player.belongsTo(db.User);
db.Player.belongsTo(db.League);
db.Tournament.hasMany(db.Match, {as: 'matches'});
db.Tournament.belongsToMany(db.Player, {through: db.TournamentPlayer});
db.TournamentPlayer.belongsTo(db.Player);
db.Player.belongsToMany(db.Tournament, {through: db.TournamentPlayer});
db.Match.belongsToMany(db.TournamentPlayer, {through: db.MatchResult});
db.MatchResult.belongsTo(db.Match);
db.Match.hasMany(db.MatchResult);
db.TournamentPlayer.belongsToMany(db.Match, {through: db.MatchResult});
db.TournamentPlayerNote.belongsTo(db.TournamentPlayer);

module.exports = db;
