const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./services/passportService');

mongoose.connect(keys.mongoURI);

const app = express();

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000; //environment variables, pass runtime configuration of the port. If doesn't exist than port = 5000 (for development environment)
app.listen(PORT); //really node is listenning on this port
