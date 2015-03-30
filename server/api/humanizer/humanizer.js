'use strict';

var humanizeDuration = require("humanize-duration");

module.exports = humanizeDuration.humanizer({
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
      }
    }
  }
});
