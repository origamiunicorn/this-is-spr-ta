var db = require("../models");

module.exports = function (app, passport) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Create a new user
  app.post("/api/user", function (req, res, next) {
    db.User.create(req.body)
      .then(function () {
        //res.json(dbUser);
        passport.authenticate('local', function (err, user, info) {
          if (info) { return next(info.message); }
          //if (!user) { return res.redirect('/login'); }
          req.logIn(user, function (err) {
            //console.log(req.session);
            if (err) { return next(err); }
            return res.redirect('/');
          });
        })(req, res, next);
      })
      .catch(function (err) {
        res.json({ error: err });
      });
  });

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the home page.
  // Otherwise the user will be sent an error
  /*app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });*/

  app.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
      if (info) { return next(info.message); }
      //if (!user) { return res.redirect('/login'); }
      req.logIn(user, function (err) {
        //console.log(req.session);
        if (err) { return next(err); }
        return res.redirect('/');
      });
    })(req, res, next);
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.session.destroy(function (err) {

      res.redirect('/');

    });
  });

  /*app.post("/login", passport.authenticate("local",
    {
      successRedirect: "/",
      failureRedirect: "/login",
      failureMessage: "Invalid username or password"
    })
  );*/
};
