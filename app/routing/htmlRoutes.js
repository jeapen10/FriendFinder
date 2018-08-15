var express = require("express");
var path = require("path");

module.exports = function(app) {
    // HTML GET Requests

    // Home page
	app.get("/", function (req, res) {
		res.sendFile("home.html", {root: path.join('app/public')});
	});

    // Survey page
	app.get('/survey', function (req, res) {
		res.sendFile("survey.html", {root: path.join('app/public')});
    });
	
	// Default home page
	app.get("*", function(req, res) {
		res.sendFile("home.html", {root: path.join('app/public')})
	});

}