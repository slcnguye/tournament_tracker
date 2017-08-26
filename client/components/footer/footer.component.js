import angular from 'angular';

import changelog from '../../../changelog';
import _ from 'lodash';

export class FooterComponent {

  constructor($uibModal) {
    'ngInject';

    this.$uibModal = $uibModal;
    this.changelog = changelog;
  }

  $onInit() {
    this.latestChangeVersion = _.first(_.keys(this.changelog));
    this.latestChangeInfo = this.changelog[this.latestChangeVersion];
  }

  showChangeLog() {
    this.$uibModal.open({
      template: require('../change-log-modal/change-log-modal.html'),
      controller: 'changeLogModal',
      controllerAs: '$ctrl',
      windowClass: 'ssk-modal-right',
      backdropClass: 'ssk-model-backdrop',
    }).result.then(() => {}, () => {});
  }

  showChangeLogIcon(lastUpdate) {
    const lastUpdateDate = new Date(lastUpdate);
    lastUpdateDate.setDate(lastUpdateDate.getDate() + 3);
    return new Date() < lastUpdateDate;
  }
}

export default angular.module('directives.footer', [])
  .component('footer', {
    template: require('./footer.html'),
    controller: FooterComponent
  })
  .name;
