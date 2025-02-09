// Import express
const express = require('express');

// Import CORS
const cors = require('cors');

// Import bodyParser
const bodyParser = require('body-parser');

// Import path
const path = require('path');

// Import router 
const router = require('./routes');

// Init app
const app = express();

// Use Cors
app.use(cors());

//use body parser
app.use(bodyParser.urlencoded({extended: false}));

//parse application/json
app.use(bodyParser.json());

//define port
const port = 3000;

//route
app.get('/', (req, res) => {
    res.send('Hello World!')
});

//define routes
app.use('/api', router);

//Route to serve uploade diles (if needed)
app.get('/uploads/:filename', (req, res) => {
    res.sendFile(path.join(__dirname, 'uploads', req.params.filename));
});

//start server
app.listen(port, '0.0.0.0', () => {
    console.log('Server running on http://0.0.0.0:3000');
  });
  