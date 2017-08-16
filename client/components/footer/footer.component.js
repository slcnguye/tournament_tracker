import angular from 'angular';

export class FooterComponent {

  constructor($uibModal) {
    'ngInject';

    this.$uibModal = $uibModal;
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
