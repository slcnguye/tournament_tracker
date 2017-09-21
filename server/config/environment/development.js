'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection options
  sequelize: {
    uri: 'mysql://tournament_tracker:Admin1!@localhost:3306/tournament_tracker',
    options: {
      logging: console.log,
    }
  },

  auth: {
    google: {
      clientId: '111372416867-9gpmh3lesm0gd6dk3l58ho6s0p53ha0f.apps.googleusercontent.com',
      clientSecret: '-4xsttt7PD8SyDMUxD8G05tH'
    },
    facebook: {
      clientId: '141753913094110',
      clientSecret: '4be9ed81be555bbc2883ab5023689b77'
    }
  },

  tokenSecret: 'tournamenttracker-secret',

  // Seed database on startup
  seedDB: true

};
