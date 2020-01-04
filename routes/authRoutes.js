const passport = require('passport');

//rounting methods
module.exports = app => {
  //route for authentication
  app.get('/auth/google', passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  //route for authentication callback
  app.get(
      '/auth/google/callback',
      passport.authenticate('google'),
      (req, res) => {
          res.redirect('/dashboard');
      }
  );

  //route for logout
  app.get('/api/logout', (req, res) => {
      req.logout(); //automatically attached to the request by passport. kills the cookie that's in there.
      res.redirect('/');
  });

  //route for getting the user's details
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
