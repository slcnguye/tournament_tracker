'use strict';

import angular from 'angular';

import LeagueJoinModal from './league-join-modal/league-join-modal.component';
import LeagueCreateModal from './league-create-modal/league-create-modal.component';

const module = angular.module('tournamentTrackerApp.league.components', [
  LeagueJoinModal,
  LeagueCreateModal
]);

export default module.name;
