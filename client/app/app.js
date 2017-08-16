'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import 'angular-validation-match';
import {name as angularChart} from 'angular-chart/angular-chart';

import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import ngenter from '../components/ng-enter/ng-enter.directive';
import Main from './main/main.component';
import NewTournament from './new-tournament/new-tournament.component';
import AddPlayer from './add-player/add-player.component';
import Tournament from './tournament/tournament.component';
import TournamentDetail from './tournament-detail/tournament-detail.component';
import PlayerStatsModal from '../components/player-stats-modal/player-stats-modal.component';
import PlayerScoreChart from '../components/player-score-chart/player-score-chart.component';
import constants from './app.constants';
import util from '../components/util/util.module';

import './app.scss';

angular.module('tournamentTrackerApp', [ngCookies, ngResource, ngSanitize, uiRouter, uiBootstrap,
  _Auth, 'validation.match', navbar, footer, ngenter, constants, util, angularChart,
  Main, AddPlayer, NewTournament, Tournament, TournamentDetail, PlayerStatsModal, PlayerScoreChart
])
  .config(routeConfig)
  .run();

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['tournamentTrackerApp'], {
      strictDi: true
    });
  });
