'use strict';

import angular from 'angular';
import {
  UtilService
} from './util.service';

export default angular.module('tournamentTrackerApp.util', [])
  .factory('Util', UtilService)
  .name;
