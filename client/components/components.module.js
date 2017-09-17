'use strict';

import angular from 'angular';

import Navbar from './navbar/navbar.component';
import Footer from './footer/footer.component';
import NgEnter from './ng-enter/ng-enter.directive';
import PlayerStatsModal from './player-stats-modal/player-stats-modal.component';
import PlayerScoreChart from './player-score-chart/player-score-chart.component';
import ChangeLogModal from './change-log-modal/change-log-modal.component';
import MatchTable from './match-table/match-table.component';

const module = angular.module('tournamentTrackerApp.components', [Navbar, Footer, NgEnter,
  PlayerStatsModal, PlayerScoreChart, ChangeLogModal, MatchTable]);

export default module.name;
