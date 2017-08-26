'use strict';
const angular = require('angular');

import _ from 'lodash';

export class matchTableComponent {
  constructor($q, TournamentPlayerService, MatchService, MatchResultService, TournamentViewService) {
    'ngInject';

    this.$q = $q;
    this.TournamentPlayerService = TournamentPlayerService;
    this.MatchService = MatchService;
    this.MatchResultService = MatchResultService;
    this.TournamentViewService = TournamentViewService;
  }

  $onInit() {
    this.preparePagedMatches(this.matches);
  }

  addMatch() {
    this.addMatching = true;
  }

  saveMatch(winner, loser) {
    const winnerScoreDelta = this.calculateScoreForWinner(winner, loser);
    const loserScoreDelta = this.calculateScoreForLoser(winner, loser);
    const match = {
      tournamentId: this.tournament._id
    };

    this.MatchService.create(match).$promise
      .then(savedMatch => {
        const updatedWinner = this.tournamentPlayersById[winner._id];
        updatedWinner.score += winnerScoreDelta;
        const updatedLoser = this.tournamentPlayersById[loser._id];
        updatedLoser.score += loserScoreDelta;

        const matchResult1 = {
          tournamentPlayerId: winner._id,
          matchId: savedMatch._id,
          scoreDelta: winnerScoreDelta,
          lastScore: updatedWinner.score,
        };

        const matchResult2 = {
          tournamentPlayerId: loser._id,
          matchId: savedMatch._id,
          scoreDelta: loserScoreDelta,
          lastScore: updatedLoser.score,
        };

        this.$q.all([
          this.MatchResultService.create(matchResult1).$promise,
          this.MatchResultService.create(matchResult2).$promise,
          this.TournamentPlayerService.patch({id: updatedWinner._id, score: updatedWinner.score}).$promise,
          this.TournamentPlayerService.patch({id: updatedLoser._id, score: updatedLoser.score}).$promise
        ]).then(matchResults => {
          savedMatch['match-results'] = [];
          savedMatch['match-results'].push(matchResults[0]);
          savedMatch['match-results'].push(matchResults[1]);
          this.matches.unshift(savedMatch);
          this.playerFilterName = null;
          this.preparePagedMatches(this.matches);
        });
      });

    this.resetMatchInputs();
  }

  cancelMatch() {
    this.resetMatchInputs();
  }

  resetMatchInputs() {
    this.addMatching = false;
    this.matchPlayer1 = null;
    this.matchPlayer2 = null;
  }

  calculateScoreForWinner(winner, loser) {
    return this.TournamentViewService.calculateScoreForWinner(this.tournament, winner, loser);
  }

  calculateScoreForLoser(winner, loser) {
    return this.TournamentViewService.calculateScoreForLoser(this.tournament, winner, loser);
  }

  // Paging & Filtering
  preparePagedMatches(matches) {
    this.filteredMatches = _.orderBy(matches, ['createdAt'], ['desc']);
    this.paging = this.paging || {};
    this.paging.totalPages = Math.ceil(_.size(this.filteredMatches) / 10);
    this.paging.pages = _.range(this.paging.totalPages);
    this.getPagedMatches(this.filteredMatches, this.paging, 0);
  }

  getPagedMatches(filteredMatches, paging, page) {
    paging.currentPage = page;
    this.pagedMatches = _.slice(filteredMatches, page * 10, page * 10 + 10);
  }

  filterOnMatchPlayerChange(playerFilterName, tournamentPlayers) {
    const tournamentPlayer = _.find(tournamentPlayers, {name: playerFilterName});
    if(this.filteredPlayer && !tournamentPlayer) {
      this.filteredPlayer = null;
      this.preparePagedMatches(this.matches);
    }
  }

  filterOnMatchPlayer(tournamentPlayer) {
    if(tournamentPlayer) {
      this.filteredPlayer = tournamentPlayer;
      const filteredMatches = _.filter(this.matches, match => {
        return _.find(match['match-results'], {tournamentPlayerId: tournamentPlayer._id});
      });
      this.preparePagedMatches(filteredMatches);
    }
  }
}

export default angular.module('tournamentTrackerApp.match-table', [])
  .component('matchTable', {
    template: require('./match-table.html'),
    bindings: {
      tournamentPlayers: '<',
      matches: '<',
      tournamentPlayersById: '<',
      tournament: '<',
      playersById: '<'
    },
    controller: matchTableComponent
  })
  .name;
