const express = require('express');
// const test = require('../Controllers/test.js');
const login = require('../Controllers/loginUser.js');
const user_Data = require('../Controllers/userdata.js');
const { registerUser, delete_user } = require('../Controllers/Register.js');
const getAllEmails = require('../Controllers/getEMails.js');
const forgotPassword = require('../Controllers/forgot_password.js');
const upload = require('../Middleware/multer_config.js');
const fuel_data = require('../Controllers/fuelData.js');
const resetPassword = require('../Controllers/resetPassword.js');
const incidentReport = require('../Controllers/incidentReport.js');
const { CreateAsset, DeleteAsset, GetAllAssets, UpdateAsset } = require('../Controllers/AssetsController.js');

const {
    createPlannedMaintenance,
    getAllMaintenanceReports,
    DeleteMaintenanceReport,
    updatePlannedMaintenance,
    createUnplannedMaintenance,
    DeleteUnplannedMaintenanceReport,
    getAllUnplannedMaintenanceReports,
    updateUnplannedMaintenance
} = require('../Controllers/Maintenance.js');

// Middleware
const authenticateToken = require('./Authenticator.js');
const validateRole = require('./Roles.js');

const router = express.Router();


router.post('/log-new-asset', authenticateToken, validateRole(["create_asset"]), upload.single('image'), CreateAsset);
router.post('/delete-asset', authenticateToken, validateRole(["delete_asset"]), DeleteAsset);
router.post('/update-asset', authenticateToken, validateRole(["update_asset"]), UpdateAsset);

// router.post('/test', upload.single('file'), test);
router.post('/login-user', login);
router.post('/user-data', user_Data);
router.post('/register-user', registerUser);
router.post('/delete-user', delete_user);
router.post('/forgot-password', forgotPassword);
router.post('/fuel-data', upload.single('image'), authenticateToken, validateRole(["create_report", "create_fuel_consumption", "get_emails"]), fuel_data);
router.post('/reset-password', resetPassword);
router.post('/report-incident', authenticateToken, validateRole([""]), incidentReport);

//Planned Maintenance Report
router.post('/create-planned-maintenance-report', authenticateToken, validateRole(["create_maintainence_log"]), createPlannedMaintenance);
router.get('/get-all-planned-maintenance-reports', authenticateToken, validateRole(["get_maintainence_log"]), getAllMaintenanceReports);
router.post('/delete-planned-maintenance-report', authenticateToken, validateRole(["delete_maintainence_log"]), DeleteMaintenanceReport);
router.post('/update-planned-maintenance-report', authenticateToken, validateRole(["update_maintainence_log "]), updatePlannedMaintenance);

// Unplaned Maintenace Report
router.post('/create-unplanned-maintenance-report', authenticateToken, validateRole(["create_maintainence_log"]), createUnplannedMaintenance);
router.get('/get-all-unplanned-maintenance-report', authenticateToken, validateRole(["get_maintainence_log"]), getAllUnplannedMaintenanceReports);
router.post('/delete-unplanned-maitenance-report', authenticateToken, validateRole(["delete_maintainence_log"]), DeleteUnplannedMaintenanceReport);
router.post('/update-unplanned-maintenance-report', authenticateToken, validateRole(["update_maintainence_log"]), updateUnplannedMaintenance),

    // Get endpoints 
    router.get('/emails', authenticateToken, getAllEmails);
router.get('/fetch-all-assets', authenticateToken, validateRole(["get_all_assets"]), GetAllAssets);

module.exports = router; 