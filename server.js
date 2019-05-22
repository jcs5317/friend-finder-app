// dependencies 
const express = require("express");
const path = require("path");

// runs express
const app = express(); 
const PORT = process.env.PORT || 3000; 


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//begins and listens to server 
app.get("/", function(req, res){
  res.send("Hello World");
});

app.listen(PORT, function () {
    console.log("server is up and running on port " + PORT)
}); 

/*data arrays 

let reservations = [

    {
        name: "jimbobjoe", 
        phoneNumber: "Phone Number", 
        email: "bob@bob.com", 
        uniqueID: "ID"

    }


]; 

// Routes 

// this will use send path for home html 
app.get("/", function(req, res) {
    res.send("Welcome to Hot Restaraunt!");
  });


  // will need to add app.gets for other html pages

//displays table infromation in JSON format 
  app.get("/api/tables", function(req, res) {
    return res.json(reservations);
  });

  // post new reservations
  app.post("/api/tables", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    //newReservation.name = newReservation.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newReservation);
  
    reservations.push(newReservation);
  
    res.json(newReservation);
  });
*/