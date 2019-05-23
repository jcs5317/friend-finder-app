// Load data
const friends = require("../data/friends.js");
const path = require("path");

// Routing
module.exports = function(app) {

    //API GET requests
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });
    app.post("/api/friends", function(req, res) {
        // Code to find best match

        // Initialize array to hold comparison results
        var smallScore = 1000000000;
        var topFriend;
        // let userScore = req.body.scores;
        // const scoresArr = [];
        // let topMatch = 0;

        //For loop through each friend in friends array to sum up the matches
        for (var i = 0; i < friends.length; i++) {
            
            var compDiff = [];

            for (var j = 0; j < friends[i].scores.length; j++) {
                compDiff.push(Math.abs(friends[i].scores[j] - req.body.scores[j]));

            }
            var matchScore = compDiff.reduce((a, b) => a + b, 0);

            if (matchScore < smallScore) {
                smallScore = matchScore;
                topFriend = friends[i];
            }
        }

        // Return top match to client
        res.json(topFriend);

        // Add current user to friendsArray
        console.log(req.body)
        friends.push(req.body);
    });
    
}