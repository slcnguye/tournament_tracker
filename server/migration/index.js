'use strict';

import Umzug from 'umzug';
import Sequelize from 'sequelize';
import {sequelize} from '../sqldb';

let migrations = function() {
  const umzug = new Umzug({
    migrations: {
      params: [ sequelize.getQueryInterface(), Sequelize ],
      path: 'server/migration/scripts'
    },
    storage: "sequelize",
    storageOptions: {
      sequelize: sequelize
    },
    logging: console.log
  });

  return umzug.up();
};

module.exports = migrations;
