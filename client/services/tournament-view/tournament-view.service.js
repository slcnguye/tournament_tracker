'use strict';

export function TournamentViewService() {
  // Inline calculations for score
  return {
    calculateScoreForWinner: function(tournament, winner, loser) {
      if(tournament.scoreType == '3PW') {
        return 3;
      } else if(tournament.scoreType == 'ELO' && winner && winner.score && loser && loser.score) {
        const k = 32;
        const eloDifference = loser.score - winner.score;
        const percentage = 1 / (1 + Math.pow(10, eloDifference / 400));

        const win = Math.round(k * (1 - percentage));
        // const draw = Math.round(k * (.5 - percentage));
        // const lose = Math.round(k * (0 - percentage));
        return win;
      }
    },

    calculateScoreForLoser: function(tournament, winner, loser) {
      if(tournament.scoreType == '3PW') {
        return 0;
      } else if(tournament.scoreType == 'ELO' && winner && winner.score && loser && loser.score) {
        const k = 32;
        const eloDifference = winner.score - loser.score;
        const percentage = 1 / (1 + Math.pow(10, eloDifference / 400));

        // const win = Math.round(k * (1 - percentage));
        // const draw = Math.round(k * (.5 - percentage));
        const lose = Math.round(k * (0 - percentage));
        return lose;
      }
    }
  }
}
