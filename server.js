// dependencies 
const bodyParser= require("body-parser");
const express = require("express");
const path = require("path");


// runs express with port for host or local
const app = express(); 
const PORT = process.env.PORT || 8080; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes.js")(app);

// Listener

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
