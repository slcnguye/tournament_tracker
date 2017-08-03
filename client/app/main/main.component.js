import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
import _ from 'lodash';

import image1 from '../../assets/images/profile_images/1.png';
import image2 from '../../assets/images/profile_images/2.jpg';
import image3 from '../../assets/images/profile_images/3.jpg';
import image4 from '../../assets/images/profile_images/4.jpg';
import image5 from '../../assets/images/profile_images/5.jpg';
import image6 from '../../assets/images/profile_images/6.jpg';
import image7 from '../../assets/images/profile_images/7.jpg';
import image8 from '../../assets/images/profile_images/8.jpg';
import image9 from '../../assets/images/profile_images/9.jpg';
import image10 from '../../assets/images/profile_images/10.jpg';

export class MainController {

  constructor($q, TournamentPlayer, Player, Tournament, Match) {
    'ngInject';

    this.$q = $q;
    this.Player = Player;
    this.TournamentPlayer = TournamentPlayer;
    this.Tournament = Tournament;
    this.Match = Match;
  }

  $onInit() {
    this.TournamentPlayer.query().$promise
      .then(tournamentPlayers => {
        // Group tournament players by tournament
        const tournamentPlayersByTournament = _.groupBy(tournamentPlayers, 'tournamentId');

        // Find most recent matches for each tournament
        const recentMatches = [];
        _.each(tournamentPlayersByTournament, players => {
          recentMatches.push(_.first(_.orderBy(players, ['updatedAt'], ['desc'])));
        });

        const orderedRecentMatches = _.orderBy(recentMatches, ['updatedAt'], ['desc']);
        const numTournamentsToDisplay = orderedRecentMatches.length > 3 ? 3 : orderedRecentMatches.length;
        const getTournamentsDeferred = [];
        for(let i = 0; i < numTournamentsToDisplay; ++i) {
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
    this.$q.all([
      this.TournamentPlayer.query({tournamentId: this.selectedTournamentId}).$promise,
      this.Match.query({tournamentId: this.selectedTournamentId}).$promise,
      this.Player.query().$promise
    ]).then(response => {
      const tournamentPlayers = _.orderBy(response[0], ['score'], ['desc']);
      this.matches = response[1];
      this.players = response[2];

      this.tournamentPlayers = _.map(tournamentPlayers, (tournamentPlayer, index) => {
        const player = angular.copy(tournamentPlayer);
        player.name = _.find(this.players, {_id: player.playerId}).name;
        player.score = player.score || 0;
        player.rank = index + 1;
        return player;
      });

      this.tournamentPlayersById = {};
      _.each(this.tournamentPlayers, tournamentPlayer => {
        this.tournamentPlayersById[tournamentPlayer._id] = tournamentPlayer;
      });
    });
  }

  getAvatar(playerId) {
    let background;
    const imageIndex = playerId % 10 + 1;
    if (imageIndex === 1) {
      background = image1;
    } else if (imageIndex === 2) {
      background = image2;
    } else if (imageIndex === 3) {
      background = image3;
    } else if (imageIndex === 4) {
      background = image4;
    } else if (imageIndex === 5) {
      background = image5;
    } else if (imageIndex === 6) {
      background = image6;
    } else if (imageIndex === 7) {
      background = image7;
    } else if (imageIndex === 8) {
      background = image8;
    } else if (imageIndex === 9) {
      background = image9;
    } else if (imageIndex === 10) {
      background = image10;
    }

    const style = {
      background: `url(${background})`,
      'background-size': 'cover',
      'background-clip': 'content-box'
    };

    return style;
  }
}

export default angular.module('tournamentTrackerApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
