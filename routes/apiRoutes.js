var db = require("../models");
var auth = function (passport, req, res, next) {
  return passport.authenticate('local', function (err, user, info) {
    if (info) { return next(info.message); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function (loginErr) {
      //console.log(loginErr);
      if (loginErr) { return res.json({ "err": loginErr }); }
      return res.redirect('/');
    });
  });
}

module.exports = function (app, passport) {
  // Create a new user
  app.post("/api/user", function (req, res, next) {
    db.User.create(req.body)
      .then(function () {
        auth(passport, req, res, next)(req, res, next);
      })
      .catch(function (err) {
        res.json({ error: err });
      });
  });

  // Route for logging user in
  app.post('/login', function (req, res, next) {
    auth(passport, req, res, next)(req, res, next);
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
      loggedIn = 0;
      res.render('index');
    });
  });


  app.put("/api/user/game", function (req, res) {
    var gameObj = {
      mostRecentGameId: req.body.mostRecentGameId
    }
    db.User.update(
      gameObj,
      {
        where: {
          id: req.user.id
        }
      }).then(function (dbGame) {
        res.json(dbGame);
      });
  });

  // Create a new game
  app.post("/api/game", function (req, res) {
    req.body.lastStoryId = 1;
    req.body.UserId = req.user.id;
    db.GameInfo.create(req.body)
      .then(function (dbGame) {
        db.User.update(
          { mostRecentGameId: dbGame.id },
          {
            where: {
              id: req.user.id
            }
          }).then(function () {
            res.json(dbGame);
          });
      })
      .catch(function (err) {
        res.json({ error: err });
      });
  });

  // update the last story id for the game
  app.put("/api/game", function (req, res) {
    var gameObj = {
      lastStoryId: req.body.lastStoryId
    }
    db.GameInfo.update(
      gameObj,
      {
        where: {
          id: req.user.mostRecentGameId
        }
      }).then(function (dbGame) {
        res.json(dbGame);
      });
  });

  // delete the game
  app.delete("/api/game/:id", function (req, res) {
    // Delete the Author with the id available to us in req.params.id
    db.GameInfo.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbGame) {
      res.json(dbGame);
    });
  });
};
