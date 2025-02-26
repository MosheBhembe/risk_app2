const express = require('express');
// const test = require('../Controllers/test.js');
const login = require('../Controllers/loginUser.js');
const user_Data = require('../Controllers/userdata.js');
const { registerUser, delete_user, getAllUsers } = require('../Controllers/Register.js');
const getAllEmails = require('../Controllers/getEMails.js');
const forgotPassword = require('../Controllers/forgot_password.js');
const upload = require('../Middleware/multer_config.js');
const { fuel_data, getAllfuelData } = require('../Controllers/fuelData.js');
const resetPassword = require('../Controllers/resetPassword.js');
const { incidentReport, getIncidentReport } = require('../Controllers/incidentReport.js');
const { CreateAsset, DeleteAsset, GetAllAssets, UpdateAsset } = require('../Controllers/AssetsController.js');
const { create_SHE_policy, get_SHE_Policy } = require('../Controllers/SHEPolicy.js');
const { createsheDocument, getSHEDocument } = require('../Controllers/SHEdoc.js');
const { createFuelReport, update_fuel_log, getfuelReport, delete_fuel_log } = require('../Controllers/AdminFuelController.js');
const { create_license_training, get_license_training } = require('../Controllers/TrainingController.js');
const {
    createPlannedMaintenance,
    getAllMaintenanceReports,
    DeleteMaintenanceReport,
    updatePlannedMaintenance,
} = require('../Controllers/Maintenance.js');

const { createInspection, getInspectionReports } = require('../Controllers/Inspections.js');
// Middleware 
const authenticateToken = require('./Authenticator.js');
const validateRole = require('./Roles.js');

const router = express.Router();

router.post('/log-new-asset', authenticateToken, validateRole(["create_asset"]), upload.single('document'), CreateAsset);
router.post('/delete-asset', authenticateToken, validateRole(["delete_asset"]), DeleteAsset);
router.post('/update-asset', authenticateToken, validateRole(["update_asset"]), UpdateAsset);
router.post('/log-SHE-document', authenticateToken, validateRole(["create_SHE_document"]), upload.single('document'), createsheDocument);
router.get('/get-SHE-Document', authenticateToken, validateRole(["get_SHE_document"]), getSHEDocument);
router.get('/get-SHE-policy', authenticateToken, validateRole(["get_SHE_policy"]), get_SHE_Policy);
router.post('/log-she-policy', authenticateToken, validateRole(["create-SHE-policy"]), upload.single('PolicyDoc'), create_SHE_policy);
router.get('/get-inspections', authenticateToken, validateRole(["get-she-inspection"]), getInspectionReports);
router.post('/create-inspection', authenticateToken, validateRole(["create-she-inspection"]), createInspection);
router.post('/login-user', login);
router.post('/user-data', user_Data);
router.post('/register-user', registerUser);
router.get('/fetch-all-users', authenticateToken, getAllUsers);
router.post('/delete-user', delete_user);
router.post('/forgot-password', forgotPassword);
router.post('/fuel-data', upload.single('image'), authenticateToken, validateRole(["create_report", "create_fuel_consumption", "get_emails"]), fuel_data);
router.post('/reset-password', resetPassword);
router.post('/report-incident', authenticateToken, validateRole(["create_incident_report", "create_fuel_consumption", "get_emails"]), incidentReport);
router.get('/fetch-incident-report', authenticateToken, validateRole(["get_incident_report", "get_incident_reports"]), getIncidentReport);
router.post('/create-admin-fuel-report', authenticateToken, validateRole(["create_Admin_Fuel_Report"]), upload.single('attachment'), createFuelReport);
router.put('/update-admin-fuel', authenticateToken, validateRole(["update_Admin_Fuel_Report"]), update_fuel_log);
router.delete('/delete-admin-fuel', authenticateToken, validateRole(["delete_Admin_Fuel_Report"]), delete_fuel_log);
router.get('/get-admin-fuel-report', authenticateToken, validateRole(["get_Admin_Fuel_Report"]), getfuelReport);
router.get('/fetch-all-fuel-reports', authenticateToken, validateRole(["get_report"]), getAllfuelData);

//Planned Maintenance Report
router.post('/create-planned-maintenance-report', authenticateToken, validateRole(["create_maintainence_log"]), upload.single('attachment'), createPlannedMaintenance);
router.get('/get-all-planned-maintenance-reports', authenticateToken, validateRole(["get_maintainence_log"]), getAllMaintenanceReports);
router.delete('/delete-planned-maintenance-report', authenticateToken, validateRole(["delete_maintainence_log"]), DeleteMaintenanceReport);
router.put('/update-planned-maintenance-report', authenticateToken, validateRole(["update_maintainence_log "]), updatePlannedMaintenance);

// Unplaned Maintenace Report
router.post('/log-license-training', authenticateToken, validateRole(["create_license-training_form"]), upload.single('document'), create_license_training);
router.get('get-license-training', authenticateToken, validateRole(["get-license_training_form"]), get_license_training);

// Get endpoints 
router.get('/emails', authenticateToken, getAllEmails);
router.get('/fetch-all-assets', authenticateToken, validateRole(["get_all_assets"]), GetAllAssets);

module.exports = router; 