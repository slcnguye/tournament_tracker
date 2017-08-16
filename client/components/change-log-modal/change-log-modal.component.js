'use strict';
const angular = require('angular');

export class changeLogModalController {

  constructor($uibModalInstance) {
    'ngInject';

    this.$uibModalInstance = $uibModalInstance;
  }

  close() {
    this.$uibModalInstance.dismiss();
  }
}

export default angular.module('tournamentTrackerApp.change-log-modal', [])
  .controller('changeLogModal', changeLogModalController)
  .name;
