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

/*
module.exports = {
  googleClientID: '787744254950-rmdtoj647ocidtku44aa8nbp4fq9p7at.apps.googleusercontent.com',
  googleClientSecret: 'l_Wu5C0GTr65MaDuvBZaWla_',
  mongoURI: 'mongodb+srv://prodUser:0V7HvMgswc6OKUOj@emaily-prod-otmcx.mongodb.net/anything?retryWrites=true&w=majority',
  cookieKey: '9sdfgkj90iFDFwgR#$^BSDFG++sdfg!'
};
*/
