'use strict';

import angular from 'angular';

import { TournamentResource } from './tournament/tournament.service';
import { TournamentPlayerNoteResource } from './tournament-player-note/tournament-player-note.service';
import { TournamentPlayerResource } from './tournament-player/tournament-player.service';
import { TournamentViewService } from './tournament-view/tournament-view.service';
import { PlayerResource } from './player/player.service';
import { MatchResource } from './match/match.service';
import { MatchResultResource } from './match-result/match-result.service';

const module = angular.module('tournamentTrackerApp.services', []);

module.service('TournamentService', TournamentResource);
module.service('TournamentPlayerNoteService', TournamentPlayerNoteResource);
module.service('TournamentPlayerService', TournamentPlayerResource);
module.service('TournamentViewService', TournamentViewService);
module.service('PlayerService', PlayerResource);
module.service('MatchService', MatchResource);
module.service('MatchResultService', MatchResultResource);

export default module.name;
