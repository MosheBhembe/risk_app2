// Maintenance.js
const mongoose = require('mongoose');


// Register
require('../Schemas/registrationData');
const Register = mongoose.model("Registration Data");

// Planned Maintenance
require('../Schemas/PlannedMaintenance');
const Maintenance = mongoose.model('Maintenance');

// Unplanned Maintenance
// require('../Schemas/UnplannedMaintainence');
// const Unplanned = mongoose.model('Unplanned');

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
        const { userId } = Request.query;
        if (!userId) {
            return Response.status(400).json({ message: 'User or company not found' });
        }

        const user = await Register.findById(userId);

        if (!user || !user.companyId) {
            return Response.status(400).json({ message: "User or company not found" });
        }

        const maintenanceReports = await Maintenance.find({ companyId: user.companyId });
        if (!maintenanceReports.length) {
            return Response.status(400).json({ message: "No reports Found" });
        }
        return Response.status(200).json(maintenanceReports);
    } catch (error) {
        return Response.status(500).json({ status: 'Error', data: error.message });
    }
}

module.exports = {
    createPlannedMaintenance,
    getAllMaintenanceReports,
    DeleteMaintenanceReport,
    updatePlannedMaintenance,
}