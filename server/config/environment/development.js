'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection options
  sequelize: {
    uri: 'mariadb://tournament_tracker:Admin1!@localhost:3306/tournament_tracker',
    options: {
      logging: console.log,
    }
  },

  facebook: {
    appId: '141753913094110'
  },

  // Seed database on startup
  seedDB: true

};
