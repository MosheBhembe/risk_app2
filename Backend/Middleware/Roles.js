// Roles.js 

const roleAccess = {
    Admin: [
        // Asset log
        "create_asset",
        "delete_asset",
        "update_asset",
        "get_all_assets",
        "get_emails",

        // Divers Log
        // "create_drivers",
        // "delete_drivers",
        // "update_drivers",
        // "get_drivers",

        // Maintainence Log
        "create_maintainence_log",
        "update_maintainence_log",
        "delete_maintainence_log",
        "get_maintainence_log"

    ],
    Manager: [
        "get_all_assets",
        "get_maintainence_log",
        "get_emailes",

    ],
    Employee: [
        "create_report",
        "create_fuel_consumption",
        "get_emails"
    ]
}

const validateRole = (requiredPermission) => {
    return (Request, Response, next) => {
        const { role } = Request.user;

        if (!role) {
            return Response.status(401).json({ message: 'Unautherized Access: Role not found' });
        }

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