// Maintenance.js
const mongoose = require('mongoose');

// Planned Maintenance
require('../Schemas/PlannedMaintenance');
const Planned = mongoose.model('Planned');

// Unplanned Maintenance
require('../Schemas/UnplannedMaintainence');
const Unplanned = mongoose.model('Unplanned');

// Create Planned Maintenance

const createPlannedMaintenance = async (Request, Response) => {
    try {
        const { vmake, vmodel, vlicenceRegistration, part, serialNumber, Description, Schedule } = Request.body
        const file = Request.file ? Request.file.path : null;
        const image = Request.file ? Request.file.path : null;

        const existingReport = await Planned.findOne({ PartSerialNumber: serialNumber });

        if (existingReport) return Response.status(400).json({
            message: "Maintenance Report exists"
        });

        const newMaintenanceReport = Planned({
            createdBy: userId,
            VehicleMake: vmake,
            VehicleModel: vmodel,
            VehicleRegistration: vlicenceRegistration,
            PartName: part,
            PartSerialNumber: serialNumber,
            PartProblemDescription: Description,
            ScheduledDate: Schedule,
            Image: image,
            File: file
        });

        await newMaintenanceReport.save();
        return Response.status(200).json({
            message: "Maintenance Report logged Successfully",
        });

    } catch (error) {
        return Response.status(500).json({ status: 'Error', message: error.message });
    }
}


// get all Planned Maintenance Reports 

const getAllMaintenanceReports = async (Request, Response) => {
    try {
        const companyId = Request.user;
        const maintain = await Planned.find({ companyId });

        if (maintain.length === 0) {
            return Response.status(400).json({
                message: "No Report found"
            });
        }
        return Response.status(200).json({
            message: maintain
        })
    } catch (error) {
        return Response.status(500).json({ status: 'Error', message: error.message });
    }
}

// Delete specific planned Maintenance reports
const DeleteMaintenanceReport = async (Request, Response) => {
    try {
        const { vRegistration } = Request.body;
        const Maintain = Planned.findOneAndDelete({
            VehicleRegistration: vRegistration
        })

        if (!Maintain) return Response.status(400).json({
            message: "Planned Maintenance Not Found"
        })

        return Response.status(200).json({
            message: "Planned Maintenance Deleted Successfully"
        })
    } catch (error) {
        return Response.status(500).json({ status: 'Error', message: error.message });
    }
}

// Update Planned Maintenance

const updatePlannedMaintenance = async (Request, Response) => {
    try {
        const { vmake, vmodel, vlicenceRegistration, part, serialNumber, Description, Schedule } = Request.body;

        const updatedPlannedMaintenance = await Planned.findOnAndUpdate(
            { vlicenceRegistration },
            { vmake, vmodel, part, serialNumber, Description, Schedule },
            { new: true, runValidators: true }
        );

        if (!updatedPlannedMaintenance) {
            return Response.status(404).json({
                message: "Report Not found"
            });
        }

        return Response.status(200).json({
            message: "Report Updated"
        })
    } catch (error) {
        return Response.status(500).json({ status: 'Error', message: error.message });
    }
}

////////////////////////////////////////////////////////////////////////////////

// create unplanned Report

const createUnplannedMaintenance = async (Request, Response) => {
    try {
        const { vmake, vmodel, vlicenceRegistration, part, serialNumber, Description, Schedule } = Request.body
        const image = Request.file ? Request.file.path : null;
        const userId = Request.user.Id;

        const existingReport = await Unplanned.findOne({ PartSerialNumber: serialNumber });

        if (existingReport) return Response.status(400).json({
            message: "Maintenance Report exists"
        });

        const newUnplannedMaintenanceReport = Unplanned({
            createdBy: userId,
            VehicleMake: vmake,
            VehicleModel: vmodel,
            VehicleRegistration: vlicenceRegistration,
            PartName: part,
            PartSerialNumber: serialNumber,
            PartProblemDescription: Description,
            ScheduledDate: Schedule,
            Image: image,
        });

        await newUnplannedMaintenanceReport.save();
        return Response.status(200).json({
            message: "Maintenance Report logged Successfully",
        });

    } catch (error) {
        return Response.status(500).json({ status: 'Error', message: error.message });
    }
}


// get all unplanned Maintenance Reports

const getAllUnplannedMaintenanceReports = async (Request, Response) => {
    try {

        const companyId = Request.user;
        const unplannedMaintain = await Unplanned.find({ companyId });

        if (maintain.length === 0) {
            return Response.status(400).json({
                message: "No Report found"
            });
        }
        return Response.status(200).json({
            message: unplannedMaintain
        })
    } catch (error) {
        return Response.status(500).json({ status: 'Error', message: error.message });
    }
}

// Delete specific unplanned Maintenance reports
const DeleteUnplannedMaintenanceReport = async (Request, Response) => {
    try {
        const { vRegistration } = Request.body;
        const Maintain = Unplanned.findOneAndDelete({
            VehicleRegistration: vRegistration
        })

        if (!Maintain) return Response.status(400).json({
            message: "Unplanned Maintenance Report Not Found"
        })

        return Response.status(200).json({
            message: "Unplanned Maintenance Report Deleted Successfully"
        })
    } catch (error) {
        return Response.status(500).json({ status: 'Error', message: error.message });
    }
}


// Update unplanned Maintenance

const updateUnplannedMaintenance = async (Request, Response) => {
    try {
        const { vmake, vmodel, vlicenceRegistration, part, serialNumber, Description, Schedule } = Request.body;

        const updatedPlannedMaintenance = await unplanned.findOnAndUpdate(
            { vlicenceRegistration },
            { vmake, vmodel, part, serialNumber, Description, Schedule },
            { new: true, runValidators: true }
        );

        if (!updatedPlannedMaintenance) {
            return Response.status(404).json({
                message: "Report Not found"
            });
        }

        return Response.status(200).json({
            message: "Report Updated"
        })
    } catch (error) {
        return Response.status(500).json({ status: 'Error', message: error.message });
    }
}
module.exports = {
    createPlannedMaintenance,
    getAllMaintenanceReports,
    DeleteMaintenanceReport,
    updatePlannedMaintenance,
    createUnplannedMaintenance,
    DeleteUnplannedMaintenanceReport,
    getAllUnplannedMaintenanceReports,
    updateUnplannedMaintenance,
}