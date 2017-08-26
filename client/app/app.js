'use strict';

import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';

import {
  routeConfig
} from './app.config';

import services from '../services/services.module';
import components from '../components/components.module';
import Main from './main/main.component';
import NewTournament from './new-tournament/new-tournament.component';
import AddPlayer from './add-player/add-player.component';
import Tournament from './tournament/tournament.component';
import TournamentDetail from './tournament-detail/tournament-detail.component';
import constants from './app.constants';

import './app.scss';

angular.module('tournamentTrackerApp', [ngCookies, ngAnimate, ngResource, ngSanitize, uiRouter, uiBootstrap,
  services, components, constants, Main, AddPlayer, NewTournament, Tournament, TournamentDetail
])
  .config(routeConfig)
  .run();

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['tournamentTrackerApp'], {
      strictDi: true
    });
  });
