'use strict';

var _ = require('lodash');
var request = require('request');
var Q = require('q');
var moment = require('moment');
var humanizeDuration = require("humanize-duration");

var shortEnglishHumanizer = humanizeDuration.humanizer({
  language: "shortEn",
  languages: {
    shortEn: {
      year: function() {
        return "y";
      },
      month: function() {
        return "mo";
      },
      week: function() {
        return "w";
      },
      day: function() {
        return "d";
      },
      hour: function() {
        return "h";
      },
      minute: function() {
        return "m";
      },
      second: function() {
        return "s";
      },
      millisecond: function() {
        return "ms";
      },
    }
  }
});

exports.show = function(req, res) {

  var projectDetailURL = "http://api.diy.org/makers/" + req.params.maker + "/projects/" + req.params.projectId;
  var requests = [];

  function getProjectDetails() {
    var result = Q.defer();
    requests.push(result.promise);
    request(projectDetailURL, function(error, response, body) {
      if (error) {
        result.reject(new Error(error));
      } else if (response.statusCode == 200) {
        result.resolve(JSON.parse(body).response);
      }
    });
  }

  function getProjectComments() {
    var result = Q.defer();
    requests.push(result.promise);
    request(projectDetailURL + "/comments", function(error, response, body) {
      if (error) {
        result.reject(new Error(error));
      } else if (response.statusCode == 200) {
        result.resolve(JSON.parse(body).response);
      }
    });
  }

  function getProjectFavorites() {
    var result = Q.defer();
    requests.push(result.promise);
    request(projectDetailURL + "/favorites", function(error, response, body) {
      if (error) {
        result.reject(new Error(error));
      } else if (response.statusCode == 200) {
        result.resolve(JSON.parse(body).response);
      }
    });
  }

  function getCurrentMakerDetails() {
    var result = Q.defer();
    requests.push(result.promise);
    request("http://api.diy.org/makers/hackkitty", function(error, response, body) {
      if (error) {
        result.reject(new Error(error));
      } else if (response.statusCode == 200) {
        result.resolve(JSON.parse(body).response);
      }
    });
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
    console.log(errors);
  });
};
