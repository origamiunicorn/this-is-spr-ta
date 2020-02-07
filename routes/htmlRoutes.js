var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    return (loggedIn) ? res.render("profile", uObj) : res.render("index");
  });

  app.get("/signin", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("signin", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/story/:story_id", isAuthenticated, function (req, res) {
    db.Story.findOne({
      where: {
        id: req.params.story_id
      },
      include: [db.Choice]
    }).then(function (data) {
      data.dataValues.body = db.Story.replaceCharName(data.dataValues.body);
      uObj.data = data.dataValues;
      res.render("story", uObj);
    });
  });

  app.get("/game", isAuthenticated, function (req, res) {
    db.GameInfo.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    }).then(function (data) {
      uObj.data = data;
      res.render("game", uObj);
    });
  });

  app.get("/start", isAuthenticated, function (req, res) {
    res.render("start", uObj);
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the non logged in homepage
  app.get("/profile", isAuthenticated, function (req, res) {
    res.render("profile", uObj);
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
