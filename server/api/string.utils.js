'use strict';

import _ from 'lodash';

let stringUtils = {};

stringUtils.generateRandString = function(numChars = 10) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for(let i = 0; i < numChars; i++) {
    text += possible.charAt(_.random(possible.length - 1));
  }

  return text;
};

module.exports = stringUtils;

