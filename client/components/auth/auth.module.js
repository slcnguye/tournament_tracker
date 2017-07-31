'use strict';

import angular from 'angular';
import constants from '../../app/app.constants';
import util from '../util/util.module';
import ngCookies from 'angular-cookies';
import {
  authInterceptor
} from './interceptor.service';
import {
  routerDecorator
} from './router.decorator';
import {
  AuthService
} from './auth.service';
import {
  UserResource
} from './user.service';
import {
  TournamentResource
} from './tournament.service';
import {
  TournamentPlayerResource
} from './tournament-player.service';
import {
  PlayerResource
} from './player.service';
import {
  MatchResource
} from './match.service';
import {
  MatchResultResource
} from './match-result.service';

import uiRouter from 'angular-ui-router';

function addInterceptor($httpProvider) {
  'ngInject';

  $httpProvider.interceptors.push('authInterceptor');
}

export default angular.module('tournamentTrackerApp.auth', [constants, util, ngCookies, uiRouter])
  .factory('authInterceptor', authInterceptor)
  .run(routerDecorator)
  .factory('Auth', AuthService)
  .factory('User', UserResource)
  .factory('Tournament', TournamentResource)
  .factory('TournamentPlayer', TournamentPlayerResource)
  .factory('Player', PlayerResource)
  .factory('Match', MatchResource)
  .factory('MatchResult', MatchResultResource)
  .config(['$httpProvider', addInterceptor])
  .name;
