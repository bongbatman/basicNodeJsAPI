const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
let app = express();


/**
 * Creates reusable chunks of code like header and footers
 */
hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');


/**
 * If we define a middleware like this then the app will not move on until we call next();
 * next serves a callback when middleware is finish executing asynchronously.
 */
app.use((req, res, next) => {
    let now = new  Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    fs.appendFileSync("server.log", log + '\n');
    //call to next(); moves forward to next request and middleware
    next();
});

//maintenance middleware
app.use((req, res, next) => {
   res.render("maintenance.hbs");

});

/**
 * express middleware can be set to do anything like this ex where we are
 * telling it to reference a static dir
 * can be used in authentication , login, response manipulation of api etc
 */
//middleware are always called in order so if this is on top we can still access static lib evn after maintenance middleware is called
app.use(express.static(__dirname + "/public"));






/**
 * Creates small functions that return dynamic value and even takes arguments
 */
hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
   return text.toUpperCase();
});

app.get("/", (req, res) => {
  // res.send("<h1>Response sent from my server</h1>");
    res.render("home.hbs", {
        title : "Home Page From app.js",
        welcomeMsg : "Swagat nahin karoge hamara ?"
    })

});

app.get("/about", (req, res) => {
    // res.send({
    //     name : "Nishant",
    //     age : 26,
    //     likes :[
    //         "Cooking",
    //         "Driving"
    //     ]
    // });
   res.render("about.hbs", {
       title : "About Page From app.js",
   });
});

app.get("/bad", (req, res) => {
    res.send({
        errorMessage : "Oops! Bad Request"
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});