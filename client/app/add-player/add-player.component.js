'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './add-player.routes';
import _ from 'lodash';

export class AddPlayerComponent {
  constructor($q, $stateParams, TournamentService, PlayerService, TournamentPlayerService, StateUtil) {
    'ngInject';
    this.TournamentService = TournamentService;
    this.PlayerService = PlayerService;
    this.TournamentPlayerService = TournamentPlayerService;
    this.$stateParams = $stateParams;
    this.$q = $q;

    this.leagueCode = StateUtil.getLeagueCodeFromUrl();
  }

  $onInit() {
    const tournamentId = this.$stateParams.tournamentId;

    this.$q.all([
      this.TournamentService.get({id: tournamentId, leagueCode: this.leagueCode}).$promise,
      this.PlayerService.query({leagueCode: this.leagueCode}).$promise,
      this.TournamentPlayerService.query({tournamentId, leagueCode: this.leagueCode}).$promise
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

    let existingPlayer = _.find(this.players, { user: { preferredName: playerName } });
    if(existingPlayer) {
      if(!_.find(this.tournamentPlayers, { playerId: existingPlayer._id, leagueCode: this.leagueCode })) {
        const initScore = this.tournament.scoreType === 'ELO' ? 2000 : 0;
        this.TournamentPlayerService.create({
          tournamentId: this.tournament._id,
          playerId: existingPlayer._id,
          score: initScore,
          leagueCode: this.leagueCode
        }).$promise
          .then(tournamentPlayer => {
            this.tournamentPlayers.push(tournamentPlayer);
          });
      }
    }
  }

  removePlayer(tournamentPlayer) {
    this.TournamentPlayerService.delete({ id: tournamentPlayer._id, leagueCode: this.leagueCode }).$promise
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
