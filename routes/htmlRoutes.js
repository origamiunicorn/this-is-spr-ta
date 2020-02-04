var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    var loggedIn = 0; uname = '';

    if (req.session && req.session.passport && req.session.passport.user) {
      loggedIn = 1;
      uname = req.session.passport.user.name;
    }

    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: `Welcome ${uname}`,
        examples: dbExamples,
        loggedIn: loggedIn
      });
    });
  });


  app.get("/signin", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("signin", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });



  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
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

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
