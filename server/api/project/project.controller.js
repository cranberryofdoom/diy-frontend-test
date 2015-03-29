'use strict';

var _ = require('lodash');
var request = require('request');
var Q = require('q');
var moment = require('moment');


exports.show = function(req, res) {

  var projectDetailURL = "http://api.diy.org/makers/" + req.params.maker + "/projects/" + req.params.projectId;
  var requests = [];

  function getProjectDetails() {
    var result = Q.defer();
    requests.push(result.promise);
    request(projectDetailURL, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var details = JSON.parse(body).response;
        result.resolve(JSON.parse(body).response);
      }
    });
  }

  function getProjectComments() {
    var result = Q.defer();
    requests.push(result.promise);
    request(projectDetailURL + "/comments", function(error, response, body) {
      if (!error && response.statusCode == 200) {
        result.resolve(JSON.parse(body).response);
      }
    });
  }

  function getProjectFavorites() {
    var result = Q.defer();
    requests.push(result.promise);
    request(projectDetailURL + "/favorites", function(error, response, body) {
      if (!error && response.statusCode == 200) {
        result.resolve(JSON.parse(body).response);
      }
    });
  }

  getProjectDetails();
  getProjectComments();
  getProjectFavorites();

  Q.all(requests).then(function(results) {
    res.render("project/show", {
      date: moment(results[0].stamp).format("MMM D, YYYY"),
      details: results[0],
      comments: results[1],
      favorites: results[2]
    });
  }, console.error);
};
