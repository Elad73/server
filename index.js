const express = require('express');
require('./services/passportService')

const app = express();





const PORT = process.env.PORT || 5000; //environment variables, pass runtime configuration of the port. If doesn't exist than port = 5000 (for development environment)
app.listen(PORT); //really node is listenning on this port
