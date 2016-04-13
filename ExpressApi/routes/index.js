//Routes
var movieJSON = require("../movies.json");

//home 
exports.home = function (req, resp) {
    
    var movies = movieJSON.movies;

    resp.render("home", {
        title : "Star Wars Movies",
        movies : movies
    });
};


//movie_single
exports.movie_single = function (req, resp) {
    
    var episode_number = req.params.episode_number;
    
    resp.send("This is a page for episode " + episode_number);
};

//notfound
exports.notfound  = function (req, resp) {
    resp.send("Page is not found");
};
