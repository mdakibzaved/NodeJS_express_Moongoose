const express = require('express');
const path = require('path'); // Ensure path module is imported
const app = express();

//✅ setting up parser for form
// to make data readable at Backend side
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup view engine to ejs
app.set('view engine', 'ejs'); // Without it, .ejs extension needs to be specified

// Serving all files in public folder as static
app.use(express.static(path.join(__dirname, 'public'))); // __dirname - complete current path





//* Display routes
app.get("/", function(req, res) {
    res.render("index"); // Render file from views folder
});


//▶️ Dynamic Routing..  username act as a variable
// Anyting in Url after / is changing can be changing multiple times then we handle throught dynamic routing 
app.get("/profile/:username", function(req, res) {    //: 
    res.send(`Welcome:  ${req.params.username}`)   
    res.render("index"); // Render file from views folder
});
app.get("/profile/:username/:age", function(req, res) {
    res.send(`Welcome:  ${req.params.username}  Age is: ${req.params.age}`)   
    res.render("index"); // Render file from views folder
});



// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).send("Sorry, can't find that!");
});

// Handle other errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

// Start server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});



 