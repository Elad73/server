//prod.js - production keys here!!!
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECERT,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  stripePublishableKey: process.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.STRIPE_SECRET_KEY,
  sendGridKey: process.SEND_GRID_KEY,
  redirectDomain: process.REDIRECT_DOMAIN
};

