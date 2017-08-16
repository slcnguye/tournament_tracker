'use strict';
const angular = require('angular');
import c3 from 'c3';

export class playerScoreChartComponent {

  constructor($timeout) {
    'ngInject';

    this.$timeout = $timeout;
  }

  $onInit() {
    let scoreColumnData = this.scores;
    scoreColumnData.unshift('Score Delta');

    let chart = c3.generate({
      bindto: '#chart',
      size: {
        height: 100
      },
      point: {
        r: 4,
      },
      data: {
        columns: [],
      },
      legend: {
        show: false
      },
      axis: {
        x: { show:false },
        y: { show:false }
      },
      tooltip: {
        show: false
      },
      color: {
        pattern: ['#ffffff']
      },
    });

    this.$timeout(() => {
      chart.load({
          columns: [
            scoreColumnData
          ]
      })
    })
  }

}

export default angular.module('tournamentTrackerApp.player-score-chart', [])
  .component('playerScoreChart', {
    template: '<div style="max-height: 200px" id="chart"></div>',
    bindings: { scores: '<' },
    controller: playerScoreChartComponent
  })
  .name;
