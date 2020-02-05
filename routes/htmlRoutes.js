var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/signin", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("signin", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/story/:story_id", function (req, res) {
    db.Story.findOne({
      where: {
        id: req.params.story_id
      },
      include: [db.Choice]
    }).then(function (data) {
      data.dataValues.body = db.Story.replaceCharName(data.dataValues.body);
      res.render("story", data.dataValues);
    });
  });

  app.get("/game", isAuthenticated, function (req, res) {
    db.GameInfo.findAll({}).then(function (data) {
      res.render("game", { data: data });
    });
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the non logged in homepage
  app.get("/dashboard", isAuthenticated, function (req, res) {
    var loggedIn = 0; uname = '';

    if (req.session && req.session.passport && req.session.passport.user) {
      loggedIn = 1;
      uname = req.session.passport.user.name;
    }

    //db.Example.findAll({}).then(function (dbExamples) {
    res.render("dashboard", {
      msg: `Welcome ${uname}`,
      loggedIn: loggedIn
    });
    //});
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
