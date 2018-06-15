//REQUIRE NPM PACKAGES
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
    mongoose.Promise = Promise;

    var app = express();
var PORT = process.env.PORT || 3000;

var hbs = exphbs({
    defaultLayout: 'main',
    helpers: {
        section: function(name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});

app.engine('handlebars', hbs);
app.set('view engine', 'handlebars');

//Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://trumpwatcher:0lInda1987@ds233769.mlab.com:33769/heroku_sf3b5khj");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//Routes
var routes = require('./controllers/articleController.js').Router;
app.use('/', routes);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
