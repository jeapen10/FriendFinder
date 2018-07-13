var friends = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        console.log(req.body.scores);

    // Receive user details
    var user = req.body;

    // parseInt for scores
    for (var i = 0; i < user.scores.length; i++) {
        user.scores[i] = parseInt(user.scores[i]);
    }

    // The default friend match is the first friend 
    // result will be whoever has the minimum difference in scores
    var bestFriendIndex = 0;
    var minimumDifference = 40;


    for (var i = 0; i < friends.length; i++) {
        var totalDifference = 0;

        for (var j = 0; j < friends[i].scores.length; j++) {
            var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
            totalDifference += difference;
        }

        // if there is a new minimum, change the best friend index and set the new minimum 
        if (totalDifference < minimumDifference) {
            bestFriendIndex = i;
            minimumDifference = totalDifference;
        }
    }

    // Once we get a match add the current user to the friends array
    friends.push(user);

    // Show the user the best friend match
    res.json(friends[bestFriendIndex]);
    });
};