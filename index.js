//initial application setup
const express = require('express'); //outof the box express doesn't come with cookies/session hangling
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); //to gives us access to cookies
const passport = require('passport'); //to make use of the cookies
const keys = require('./config/keys');
require('./models/User'); //the order here is important, use this require before require for passportService
require('./services/passportService');

mongoose.connect(keys.mongoURI);

const app = express();

//tell express to add cookies to the application
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //how long the cookie can live in the browser without automatically expire - 30 days, in miliseconds
    keys: [keys.cookieKey] //array of multiple keys as another layer for security
  })
);

//tell the app through passport that we should add cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  //Express will serve up production assets
  //like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  //Express will serve up the index.html file
  //if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000; //environment variables, pass runtime configuration of the port. If doesn't exist than port = 5000 (for development environment)
app.listen(PORT); //really node is listenning on this port
