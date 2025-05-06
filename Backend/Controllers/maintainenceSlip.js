const mongoose = require('mongoose');

require('../Schemas/Maintenance_Slip');
const Maintenance_Slip = mongoose.model("Maintenance_Slip");

require('../Schemas/registrationData');
const Register = mongoose.model('Registration Data');

const maintenance_slips = async (Request, Response) => {
    try {
        const { name, registration, date, time, cost, description, odometer } = Request.body;
        const image = Request.file ? Request.file.path : null;

        const users_Email = await Register.findOne().select('Email');
        const userId = Request.user.id;

        if (!image) {
            return Response.status(400).json({ message: 'No Image uploaded' });
        }

        const newMaintenanceSlip = Maintenance_Slip({
            createdBy: userId,
            Name: name,
            Registration: registration, 
            DateDone: date,
            TimeDone: time, 
            Cost: cost,
            Description: description,
            KM: odometer,
            Image: image
        })
        await newMaintenanceSlip.save();
        Response.status(200).json({
            message: 'Data Sent'
        })

    } catch (error) {
        Response.status(500).send({ status: 'Error', data: error.message });
    }
}

const getAllMaintenanceSlips = async (Request, Response) => {
    try {
        const userId = Request.user.id;

        if (!userId) {
            return Response.status(404).json({
                message: 'User not found'
            })

            const user = await Register.findById(userId);
            if (!user || !user.companyId) {
                return Response.status(404).json({ message: "No user or Company Exists" })
            }

            const MaintenaceLog = await Maintenance_Slip.find({ companyId: user.companyId })

            if (!MaintenaceLog) {
                return Response.status(404).json({
                    message: "No Maintenance Data found"
                });
            }

            return Response.status(200).json(MaintenaceLog);

        }
    } catch (error) {
        return Response.status(500).json({ message: "Server Error" });
    }
}

module.exports = { maintenance_slips, getAllMaintenanceSlips };