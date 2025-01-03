const express = require ('express'); 
const test = require('../Controllers/test.js'); 
const login = require('../Controllers/loginUser.js'); 
const user_Data = require('../Controllers/userdata.js'); 
const registerUser = require('../Controllers/Register.js'); 
const getAllEmails = require('../Controllers/getEMails.js'); 
const forgotPassword = require('../Controllers/forgot_password.js'); 
const fuel_data = require('../Controllers/fuelData.js');
const resetPassword = require('../Controllers/resetPassword.js'); 
const tyre = require('../Controllers/TyreChangeData.js'); 
const incidentReport = require('../Controllers/incidentReport.js'); 
const upload = require('../Middleware/multer_config.js'); 



const router = express.Router();

router.get('/test', test);
router.post('/login-user', login);
router.post('/user-data', user_Data); 
router.post('/register-user', registerUser); 
router.post('/forgot-password', forgotPassword); 
router.get('/emails', getAllEmails); 
router.post('/fuel-data', upload.single('image'), fuel_data); 
router.post('/reset-password', resetPassword); 
router.post('/tyre-change', tyre); 
router.post('/report-incident', incidentReport); 

module.exports = router; 