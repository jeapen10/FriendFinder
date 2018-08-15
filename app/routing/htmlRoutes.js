var express = require("express");
var path = require("path");

module.exports = function(app) {
    // HTML GET Requests

    // Home page
	app.get("/", function (req, res) {
		res.sendFile(path.join(__dirname + '/../public/home.html'));
	});

    // Survey page
	app.get('/survey', function (req, res) {
		res.sendFile(path.join(__dirname + '/../public/survey.html'));
    });
	
	// Default home page
	// app.get("*", function(req, res) {
	// 	res.sendFile("home.html", path.join(__dirname, '/../app/public'));
	// });

}