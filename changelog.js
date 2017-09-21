'use strict';

const changelog = {
  'v3.0.0': {
    date: '2017-09-21',
    author: 'Sang Nguyen',
    changes: [
      { description: 'New login page.' },
      { description: 'Added concept of leagues.' },
    ]
  },
  'v2.1.0': {
    date: '2017-09-04',
    author: 'Sang Nguyen',
    changes: [
      { description: 'Added support for authentication with Google.' },
      { description: 'Added createdBy and updatedBy columns.' },
    ]
  },
  'v2.0.0': {
    date: '2017-08-31',
    author: 'Sang Nguyen',
    changes: [
      { description: 'Added support for authentication with Facebook.' }
    ]
  },
  'v1.9.0': {
    date: '2017-08-26',
    author: 'Sang Nguyen',
    changes: [
      { description: 'Screens are now mobile friendly.' }
    ]
  },
  'v1.8.0': {
    date: '2017-08-26',
    author: 'Sang Nguyen',
    changes: [
      { description: 'Moved changelog into separate file.' },
      { description: 'Updates to form input styles.' }
    ]
  },
  'v1.7.0': {
    date: '2017-08-26',
    author: 'Sang Nguyen',
    changes: [
      { description: 'Added ability to filter matches by player name.' },
      { description: 'Fixed bug around entering player names when adding matches.' }
    ]
  },
  'v1.6.1': {
    date: '2017-08-24',
    author: 'Sang Nguyen',
    changes: [
      { description: 'Fixed pagination bar not showing up.' }
    ]
  },
  'v1.6.0': {
    date: '2017-08-23',
    author: 'Sang Nguyen',
    changes: [
      { description: 'You can now add notes per tournament player.' },
      { description: 'Added loading spinners to player and match tables.' }
    ]
  },
  'v1.5.1': {
    date: '2017-08-22',
    author: 'Sang Nguyen',
    changes: [
      { description: 'Update favicon.' },
      { description: 'Fixed sorting issue for matches.' },
      { description: 'Update styling on modals to fade out.' }
    ]
  },
  'v1.5.0': {
    date: '2017-08-22',
    author: 'Sang Nguyen',
    changes: [
      { description: 'New logos!' }
    ]
  },
  'v1.4.0': {
    date: '2017-08-16',
    author: 'Sang Nguyen',
    changes: [
      { description: 'Added paging to tournament matches.' }
    ]
  },
  'v1.3.0': {
    date: '2017-08-16',
    author: 'Sang Nguyen',
    changes: [
      { description: 'Added changelog modal.' }
    ]
  },
  'v1.2.0': {
    date: '2017-08-16',
    author: 'Sang Nguyen',
    changes: [
      { description: 'Added recalc score functionality.' },
      { description: 'Added score chart to player stats modal.' }
    ]
  },
};

module.exports = changelog;
