// This is middleware for restricting routes a user is not allowed to visit if not logged in
var uname = ''; loggedIn = 0; uObj = {};

module.exports = function (req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  if (req.user) {

    //if (req.session && req.session.passport && req.session.passport.user) {
    loggedIn = 1;
    uname = req.session.passport.user.name;
    umail = req.session.passport.user.email;
    //}

    uObj = {
      msg: `Welcome ${uname}`,
      name: `${uname}`,
      email: `${umail}`,
      loggedIn: loggedIn
    }
    return next();
  }

  // If the user isn't logged in, redirect them to the login page
  return res.redirect("/");
};
