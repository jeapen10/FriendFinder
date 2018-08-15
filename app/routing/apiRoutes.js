var express = require("express");
var friends = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        console.log(req.body.scores);

    // Receive newUser details
    var newUser = req.body;
    console.log(newUser);
    
    newUser.scores.forEach(function(score) {
        if (score.scores == "1 (Strongly Disagree)") {
            score.scores = 1;
        }
        else if (score.scores == "5 (Strongly Agree)") {
            score.scores = 5;
        }
        else {
            score.scores = parseInt(score.scores);
        }
    });

    var bestMatch = {};
    var matchedFriend = 0;

    // Max possible different score is 50 (5 * 10 questions = 50 minus 1 * 10 questions = 10. Total 40)
    var bestMatchScore = 40;

    for (var friend = 0; friend < friends.length; friend++) {
        var totalScoreDifference = 0;

        for (var score = 0; score < friends[friend].scores.length; score++) {
            var diff = Math.abs(friends[friend].scores[score] - newUser.scores[score]);
            totalScoreDifference += diff;
          }
          
          console.log(totalScoreDifference, friends[friend].name);
          
          if (totalScoreDifference < bestMatchScore) {
            matchedFriend = friend;
            bestMatchScore = totalScoreDifference;
          }
        }

        // Found a friend
        bestMatch = friends[matchedFriend];
        // Push new friend to friends array
        friends.push(newUser);
        // Return best match 
        res.json(bestMatch);
    })
}