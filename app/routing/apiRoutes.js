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

        // keys to hold comparison results
        const smallScore = 1000000000;
        const topFriend;
        

        //For loop through each friend in friends array to sum up the matches
        for (let i = 0; i < friends.length; i++) {
            
            const compDiff = [];

            for (let j = 0; j < friends[i].scores.length; j++) {
                compDiff.push(Math.abs(friends[i].scores[j] - req.body.scores[j]));

            }
            const matchScore = compDiff.reduce(a, b);

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