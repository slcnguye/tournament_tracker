'use strict';
const angular = require('angular');

import changelog from '../../../changelog';

export class changeLogModalController {

  constructor($uibModalInstance) {
    'ngInject';

    this.$uibModalInstance = $uibModalInstance;
    this.changelog = changelog;
  }

  close() {
    this.$uibModalInstance.dismiss();
  }
}

export default angular.module('tournamentTrackerApp.change-log-modal', [])
  .controller('changeLogModal', changeLogModalController)
  .name;
