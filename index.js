const express = require('express');
const app = express();

//route handler associated with the get method
app.get('/', (req, res) =>  {
  res.send({ bye: 'buddy' });
});

const PORT = process.env.PORT || 5000; //environment variables, pass runtime configuration of the port. If doesn't exist than port = 5000 (for development environment)
app.listen(PORT); //really node is listenning on this port
 
