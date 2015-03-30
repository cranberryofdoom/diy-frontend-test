/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var projectController = require('./api/project/project.controller');

module.exports = function(app) {

  // Insert routes below
  app.use('/:maker/:projectId', projectController.show);

  // All undefined asset or api routes should return a 404
  app.route('/*')
    .get(errors[404]);

};
