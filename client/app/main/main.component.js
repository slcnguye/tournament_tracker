import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
import _ from 'lodash';

export class MainController {

  constructor($q, TournamentPlayer, Tournament) {
    'ngInject';

    this.$q = $q;
    this.TournamentPlayer = TournamentPlayer;
    this.Tournament = Tournament;
  }

  $onInit() {
    this.TournamentPlayer.query().$promise
      .then(tournamentPlayers => {
        // Group tournament players by tournament
        const tournamentPlayersByTournament = _.groupBy(tournamentPlayers, 'tournamentId');

        // Find most recent matches for each tournament
        const recentMatches = [];
        _.each(tournamentPlayersByTournament, (players) => {
          recentMatches.push(_.first(_.orderBy(players, ['updatedAt'], ['desc'])));
        });

        const orderedRecentMatches = _.orderBy(recentMatches, ['updatedAt'], ['desc']);
        const numTournamentsToDisplay = orderedRecentMatches.length > 3 ? 3 : orderedRecentMatches.length;
        const getTournamentsDeferred = [];
        for (let i = 0; i < numTournamentsToDisplay; ++i) {
          const tournamentId = orderedRecentMatches[i].tournamentId;
          getTournamentsDeferred.push(this.Tournament.get({ id: tournamentId }).$promise);
        }

        this.$q.all(getTournamentsDeferred)
          .then(tournaments => {
            this.activeTournaments = tournaments;
            this.setSelectedTournament(_.first(tournaments));
          });
      });
  }

  setSelectedTournament(tournament) {
    this.selectedTournamentId = tournament._id;
  }
}

export default angular.module('tournamentTrackerApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
