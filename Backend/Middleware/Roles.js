// Roles.js 

const roleAccess = {
    Admin: [
        // Asset log
        "create_asset",
        "delete_asset",
        "update_asset",
        "get_all_assets",
        "get_emails",
        "get_report",

        // Maintainence Log
        "create_maintainence_log",
        "update_maintainence_log",
        "delete_maintainence_log",
        "get_maintainence_log",

        // Get incident reports
        "get_incident_report",
        "update_incident_report",

        // SHE DOCUMENT
        "create_SHE_document",
        "update_SHE_document",
        "delete_SHE_document",
        "get_SHE_document",

        // SHE Policy
        "create_SHE_policy",
        "get_SHE_policy",

        // Admin Fuel Report 
        "create_Admin_Fuel_Report",
        "update_Admin_Fuel_Report",
        "delete_Admin_Fuel_Report",
        "get_Admin_Fuel_Report",
        "create_license-training_form",
        "get_license_training_form",
        "create-she-inspection",
        "create_asset_licence",
        "get_maintenance_slip",
        "updated_inspection",
        "create_investigation",
        "update_investigation",
        "getInvestigation",
        "create-observation",
        "create-pre-trip-inspection",
        "get-all-pre-trip-inspections",
        "create-post-inspection",
        "get-post-inspection"
    ],
    Manager: [
        "get_all_assets",
        "get_maintainence_log",
        "get_emailes",
        "get_SHE_policy",
        "get_SHE_document",
        "get-license_training_form",
        "create-she-inspection",
        "get_report",
        "create_asset_licence",
        "getInvestigation",
        "create-observation",
        "create-pre-trip-inspection",
        "get-all-pre-trip-inspections",
        "create-post-inspection",
        "get-post-inspection"
    ],
    Employee: [
        "create_incident_report",
        "create_fuel_consumption",
        "get_emails",
        "get-she-inspection",
        "get_all_assets",
        "get_incident_reports",
        "get_SHE_document",
        "get_SHE_policy",
        "get_maintainence_log",
        "get_all_assets",
        "fetch_asset_licence",
        "create_maintenance_slip",
        "get_maintenance_slip",
        "get_report",
        "create-she-awareness",
        "create-observation",
        "get-observation-report",
        "create-pre-trip-inspection",
        "get-all-pre-trip-inspections",
        "create-post-inspection",
        "get-post-inspection"
    ]
}

const validateRole = (requiredPermission) => {
    return (Request, Response, next) => {

        if (!Request.user || Request.user.Role) {
            return Response.status(401).json({ message: 'Unautherized Access: Role not found' });
        }

        const { role } = Request.user;

        const permissions = roleAccess[role];

        if (!permissions) {
            return Response.status(403).json({ message: `Forbidden: role (${role}) is Unautherized to access this` });
        }

        const hasPermission = requiredPermission.some(permission => permissions.includes(permission));

        if (!hasPermission) return Response.status(403).json({
            message: 'Forbidden: you do not have permission to perform of the requested actions'
        })

        next();
    };
};

module.exports = validateRole;