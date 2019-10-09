const passport = require('passport');

module.exports = app => {
  //route for authentication
  app.get('/auth/google', passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
      '/auth/google/callback',
      passport.authenticate('google'),
      (req, res) => {
          res.redirect('/dashboard');
      }
  );

  app.get('/api/logout', (req, res) => {
      req.logout(); //automatically attached to the request by passport. kills the cookie that's in there.
      res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
