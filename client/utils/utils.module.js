'use strict';

import angular from 'angular';

import { StateUtil } from './state/state.util';

const module = angular.module('tournamentTrackerApp.utils', []);

module.service('StateUtil', StateUtil);

export default module.name;
