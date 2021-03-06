var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // Load index page
  app.get("/", isAuthenticated, function (req, res) {
    return res.render("index", uObj);
  });

  app.get("/profile", isAuthenticated, function (req, res) {
    return res.render("profile", uObj);
  });

  app.get("/story/:story_id", isAuthenticated, function (req, res) {
    db.Story.findOne({
      where: {
        id: req.params.story_id
      },
      include: [db.Choice]
    }).then(function (data) {
      if (data) {
        replaceNameTag(req, res, function (response) {
          var text = data.dataValues.body.replace(/{{name}}/g, response.charName);
          data.dataValues.body = text;
          uObj.data = data.dataValues;
          res.render("story", uObj);
        })
      } else {
        res.render("404");
      }
    });
  });

  app.get("/game", isAuthenticated, function (req, res) {
    db.GameInfo.findAll({
      where: {
        UserId: req.user.id
      },
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


function replaceNameTag(req, res, cb) {
  db.GameInfo.findOne({
    where: {
      id: req.user.mostRecentGameId
    }
  }).then(function (data) {
    cb(data);
  });
}