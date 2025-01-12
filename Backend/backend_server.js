// imports
const express = require('express'); 
require('dotenv').config(); 
const cors = require('cors'); 
const dbconnection = require('./Database/db_connection.js'); 
const router = require('./Middleware/Router'); 


// configurations
const app = express();
app.use(cors({
    origin: '*',
    methods: 'POST, GET, PUT, PATCH, POST, DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type, Authorization'
}));

app.use(express.json()); 
app.use('/api', router); 
app.use(express.urlencoded({extended: false})); 

const port = process.env.port || 5001; 

// Starting server
dbconnection(); 
app.listen(port, ()=> {
    console.log(`Server now listening on port ${port}`); 
});
