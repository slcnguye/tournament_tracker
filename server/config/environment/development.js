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

  // Seed database on startup
  seedDB: true

};
