'use strict';

var _ = require('lodash');
var request = require('request');
var Q = require('q');
var moment = require('moment');
var shortEnglishHumanizer = require('../humanizer/humanizer');

exports.show = function(req, res) {

  var projectDetailURL = "http://api.diy.org/makers/" + req.params.maker + "/projects/" + req.params.projectId;
  var requests = [];

  function makeRequestTo(url, result) {
    request(url, function(error, response, body) {
      if (response.statusCode == 404) {
        result.reject(JSON.parse(body).response.error);
      } else if (response.statusCode == 200) {
        result.resolve(JSON.parse(body).response);
      }
    });
  };

  function getProjectDetails() {
    var result = Q.defer();
    requests.push(result.promise);
    makeRequestTo(projectDetailURL, result);
  }

  function getProjectComments() {
    var result = Q.defer();
    requests.push(result.promise);
    makeRequestTo(projectDetailURL + "/comments", result);
  }

  function getProjectFavorites() {
    var result = Q.defer();
    requests.push(result.promise);
    makeRequestTo(projectDetailURL + "/favorites", result);
  }

  function getCurrentMakerDetails() {
    var result = Q.defer();
    requests.push(result.promise);
    makeRequestTo("http://api.diy.org/makers/hackkitty", result);
  }

  getProjectDetails();
  getProjectComments();
  getProjectFavorites();
  getCurrentMakerDetails();

  Q.all(requests).then(function(results) {
    var date = moment(new Date(results[0].stamp));
    for (var i = 0; i < results[1].length; i++) {
      var dateDiff = shortEnglishHumanizer((new Date() - new Date(results[1][i].stamp)), {
        round: true
      });
      requests[1][i].stamp = dateDiff.split(",")[0];
    }
    res.render("project/show", {
      date: date.format("MMM D, YYYY"),
      details: results[0],
      comments: results[1],
      favorites: results[2],
      currentMaker: results[3]
    });
  }, function(errors) {
    res.render("404");
  });
};
