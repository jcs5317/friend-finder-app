// Load data
const friends = require("../data/friends");

// Routing
module.exports = (app) => {

    //GET requests
    app.get("/api/friends", (req, res) => {
        res.json(friends);
    });

    //POST requests
    app.post("/api/friends", (req, res) => {
        // console.log(req.body)
        // console.log(friends)
        // Code to find best matchs
        // keys to hold comparison results
        let smallScore = 1000000000;
        let topFriend;
        // let userScore = req.body.scores;
        // const scoresArr = [];
        // let topMatch = 0;

        //For loop through each friend in friends array to sum up the matches
        for (let i = 0; i < friends.length; i++) {
            
            // let compDiff = [];
            var matchScore;

            for (let j = 0; j < friends[i].scores.length; j++) {
                matchScore = (Math.abs(friends[i].scores[j] - parseInt(req.body.scores[j])));
            }

            // let matchScore = compDiff.reduce(a, b);

            if (matchScore < smallScore) {
                smallScore = matchScore;
                topFriend = friends[i];
            }
        }

        // Add current user to friendsArray
        //console.log(req.body)
        friends.push(req.body);
        // Return top match to client
        res.json(topFriend);
    }); 
}