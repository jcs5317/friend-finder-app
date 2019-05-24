// dependencies 
const express = require("express");

// runs express with port for host or local
const app = express(); 
const PORT = process.env.PORT || 8080; 

// format inbound data
// allows nested objs and arrays
app.use(express.urlencoded({ extended: true }));

// convesrts data to json
app.use(express.json());

// read static files ie CSS
app.use(express.static("./app/public"));

// routes
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// Listener

app.listen(PORT, () => {
    console.log("🌎 ==> App now listening on PORT: " + PORT);
});
