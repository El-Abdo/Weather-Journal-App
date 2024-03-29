// Setup empty JS object to act as endpoint for all routes
projectData = {};

//setting port


// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;

// Server Status
const status = app.listen(port, () => {
    console.log(`running on local host: ${port}`);
})

// a GET route that returns the projectData object in server code
 app.get('all', function (req,res) {
     res.send(projectData);
 })

// The POST route

app.post('add', function (req,res) {
    console.log(req.body);
    projectData = {
		temp: req.body.temp,
        date: req.body.date,
	    content: req.body.content
	};
	
})

