var db = require("../models");
var auth = function (passport, req, res, next) {
  return passport.authenticate('local', function (err, user, info) {
    if (info) { return next(info.message); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function (loginErr) {
      console.log(loginErr);
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
      res.redirect('/');
    });
  });
};
