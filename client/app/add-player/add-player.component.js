'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './add-player.routes';
import _ from 'lodash';

export class AddPlayerComponent {
  constructor($q, $stateParams, TournamentService, PlayerService, TournamentPlayerService) {
    'ngInject';
    this.TournamentService = TournamentService;
    this.PlayerService = PlayerService;
    this.TournamentPlayerService = TournamentPlayerService;
    this.$stateParams = $stateParams;
    this.$q = $q;
  }

  $onInit() {
    const tournamentId = this.$stateParams.tournamentId;

    this.$q.all([
      this.TournamentService.get({id: tournamentId}).$promise,
      this.PlayerService.query().$promise,
      this.TournamentPlayerService.query({tournamentId}).$promise
    ]).then(response => {
      this.tournament = response[0];
      this.players = response[1];
      this.tournamentPlayers = response[2];
      this.playersById = {};
      _.each(this.players, player => {
        this.playersById[player._id] = player;
      });
    });
  }

  addPlayer() {
    const playerName = this.playerNameToAdd;
    this.playerNameToAdd = null;

    let promise;
    let existingPlayer = _.find(this.players, { name: playerName });
    if(!existingPlayer) {
      promise = this.PlayerService.create({ name: playerName }).$promise
        .then(savedPlayer => {
          this.players.push(savedPlayer);
          this.playersById[savedPlayer._id] = savedPlayer;
          return savedPlayer;
        });
    } else {
      promise = existingPlayer;
    }

    this.$q.when(promise).then(player => {
      if(!_.find(this.tournamentPlayers, { playerId: player._id })) {
        const initScore = this.tournament.scoreType === 'ELO' ? 2000 : 0;
        this.TournamentPlayerService.create({
          tournamentId: this.tournament._id,
          playerId: player._id,
          score: initScore
        }).$promise
          .then(tournamentPlayer => {
            this.tournamentPlayers.push(tournamentPlayer);
          });
      }
    });
  }

  removePlayer(tournamentPlayer) {
    this.TournamentPlayerService.delete({ id: tournamentPlayer._id }).$promise
      .then(() => {
        _.pull(this.tournamentPlayers, tournamentPlayer);
      });
  }
}

export default angular.module('tournamentTrackerApp.add-player', [uiRouter])
  .config(routes)
  .component('addPlayer', {
    template: require('./add-player.html'),
    controller: AddPlayerComponent,
    controllerAs: '$ctrl'
  })
  .name;
