const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const dbconnection = require('./Database/db_connection.js');
const router = require('./Middleware/Router.js');

const app = express();
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
// configurations

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
// app.use(express.urlencoded({ extended: false }));

const port = process.env.port || 5001;

// Starting server
dbconnection();
app.listen(port, () => {
    console.log(`Server now listening on port ${port}`);
});
// module.exports = app; 