// Maintenance.js
const mongoose = require('mongoose');

// Planned Maintenance
require('../Schemas/PlannedMaintenance');
const Maintenance = mongoose.model('Maintenance');

// Unplanned Maintenance
require('../Schemas/UnplannedMaintainence');
const Unplanned = mongoose.model('Unplanned');

// Create Planned Maintenance

const createPlannedMaintenance = async (Request, Response) => {
    try {
        const { registration, mtce, date, cost, km } = Request.body;
        const attachment = Request.file ? Request.file.path : null;
        const userId = Request.user.Id;


        const newMaintenanceLog = Maintenance({
            userId,
            Registration: registration,
            MTCE: mtce,
            DateDone: date,
            Cost: cost,
            Kilometers: km,
            Attachment: attachment
        });

        await newMaintenanceLog.save();
        return Response.status(200).json({
            message: "Logged to Maintenance"
        });

    } catch (error) {
        return Response.status(500).json({ status: "Error", error: error });
    }
}

// Update Planned Maintenance

const updatePlannedMaintenance = async (Request, Response) => {
    try {
        const { registration, mtce, date, cost, km } = Request.body;

        const updatedPlannedMaintenance = await Maintenance.findOneAndUpdate(
            { registration },
            { mtce, date, cost, km },
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

// Delete Maintenance Report

const DeleteMaintenanceReport = async (Request, Response) => {
    try {
        const { registration } = Request.body;

        const log = await Maintenance.findOneAndDelete({ Registration: registration });
        if (!log) return Response.status(400).json({
            message: "Maintenance report not found"
        })

        return Response.status(200).json({
            message: "Maintenance report Deleted"
        })
    } catch (error) {
        return Response.status(500).json({ status: 'Error', data: error.message });
    }
}


// get Maintenance Reports
const getAllMaintenanceReports = async (Request, Response) => {
    try {
        const MaintenanceReports = await Maintenance.find();
        if (!MaintenanceReports) return Response.status(404).json({ message: "No maintenance reports found" });
        return Response.status(200).json({ message: MaintenanceReports })
    } catch (error) {
        return Response.status(500).json({ status: 'Error', data: error.message });
    }
}

////////////////////////////////////////////////////////////////////////////////

// create unplanned Report

const createUnplannedMaintenance = async (Request, Response) => {
    try {
        const { vmake, vmodel, vlicenceRegistration, part, serialNumber, Description, Schedule } = Request.body
        const attachment = Request.file ? Request.file.path : null;
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
            Image: attachment,
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