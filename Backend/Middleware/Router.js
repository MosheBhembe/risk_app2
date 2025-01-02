const express = require ('express'); 
const test = require('../Controllers/test.js'); 
const login = require('../Controllers/loginUser.js'); 
const user_Data = require('../Controllers/userdata.js'); 


const router = express.Router();

router.get('/test', test);
router.post('/login-user', login);
router.post('/user-data', user_Data)

module.exports = router; 

