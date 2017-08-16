'use strict';
const angular = require('angular');

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

export class playerStatsModalController {

  constructor($uibModalInstance, tournamentPlayer, matches) {
    'ngInject';

    this.$uibModalInstance = $uibModalInstance;
    this.tournamentPlayer = tournamentPlayer;
    this.matches = _.orderBy(matches, ['createdAt'], ['asc']);
  }

  $onInit() {
    this.playerStats = this.calcPlayerStats(this.tournamentPlayer, this.matches);
  }

  calcPlayerStats(tournamentPlayer, matches) {
    const playerStats = {};
    playerStats.totalMatches = matches.length || 0;
    playerStats.wins = _.filter(matches, match => {
      return _.find(match['match-results'], matchResult => {
        return matchResult.tournamentPlayerId === tournamentPlayer._id && matchResult.scoreDelta > 0;
      });
    }).length || 0;
    playerStats.losses = _.filter(matches, match => {
      return _.find(match['match-results'], matchResult => {
        return matchResult.tournamentPlayerId === tournamentPlayer._id && matchResult.scoreDelta <= 0;
      });
    }).length || 0;

    if(playerStats.totalMatches > 0) {
      playerStats.winPercentage = parseFloat(playerStats.wins * 100 / playerStats.totalMatches).toFixed(2) + '%';
    } else {
      playerStats.winPercentage = '-';
    }

    playerStats.matchScores = [];
    if (playerStats.totalMatches > 0) {
      const firstMatchResult = _.find(_.first(matches)['match-results'], matchResult => {
        return matchResult.tournamentPlayerId === tournamentPlayer._id;
      });
      playerStats.matchScores.push(firstMatchResult.lastScore);
      _.each(matches, match => {
        const playerMatchResult = _.find(match['match-results'], matchResult => {
          return matchResult.tournamentPlayerId === tournamentPlayer._id;
        });
        playerStats.matchScores.push(playerMatchResult.lastScore + playerMatchResult.scoreDelta);
      });
    }

    return playerStats;
  }

  getAvatar(playerId) {
    let background;
    const imageIndex = playerId % 10 + 1;
    if(imageIndex === 1) {
      background = image1;
    } else if(imageIndex === 2) {
      background = image2;
    } else if(imageIndex === 3) {
      background = image3;
    } else if(imageIndex === 4) {
      background = image4;
    } else if(imageIndex === 5) {
      background = image5;
    } else if(imageIndex === 6) {
      background = image6;
    } else if(imageIndex === 7) {
      background = image7;
    } else if(imageIndex === 8) {
      background = image8;
    } else if(imageIndex === 9) {
      background = image9;
    } else if(imageIndex === 10) {
      background = image10;
    }

    const style = {
      background: `url(${background})`,
      'background-size': 'cover',
      'background-clip': 'content-box'
    };

    return style;
  }

  close() {
    this.$uibModalInstance.dismiss();
  }
}

export default angular.module('tournamentTrackerApp.player-stats-modal', [])
  .controller('playerStatsModal', playerStatsModalController)
  .name;
