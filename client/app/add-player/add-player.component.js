'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './add-player.routes';
import _ from 'lodash';

export class AddPlayerComponent {
  constructor($state, $q, $stateParams, Tournament, Player, TournamentPlayer) {
    'ngInject';
    this.Tournament = Tournament;
    this.Player = Player;
    this.TournamentPlayer = TournamentPlayer;
    this.$stateParams = $stateParams;
    this.$q = $q;
  }

  $onInit() {
    const tournamentId = this.$stateParams.tournamentId;

    this.$q.all([
      this.Tournament.get({id: tournamentId}).$promise,
      this.Player.query().$promise,
      this.TournamentPlayer.query({tournamentId}).$promise
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
      promise = this.Player.create({ name: playerName }).$promise
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
        this.TournamentPlayer.create({
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
    this.TournamentPlayer.delete({ id: tournamentPlayer._id }).$promise
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
