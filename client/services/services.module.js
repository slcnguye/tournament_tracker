'use strict';

import angular from 'angular';

import { TournamentService } from './tournament/tournament.service';
import { TournamentPlayerNoteService } from './tournament-player-note/tournament-player-note.service';
import { TournamentPlayerService } from './tournament-player/tournament-player.service';
import { TournamentViewService } from './tournament-view/tournament-view.service';
import { PlayerService } from './player/player.service';
import { MatchService } from './match/match.service';
import { MatchResultService } from './match-result/match-result.service';

const module = angular.module('tournamentTrackerApp.services', []);

module.service('TournamentService', TournamentService);
module.service('TournamentPlayerNoteService', TournamentPlayerNoteService);
module.service('TournamentPlayerService', TournamentPlayerService);
module.service('TournamentViewService', TournamentViewService);
module.service('PlayerService', PlayerService);
module.service('MatchService', MatchService);
module.service('MatchResultService', MatchResultService);

export default module.name;
