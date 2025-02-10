const { Admin } = require('mongodb');
const mongoose = require('mongoose');
require('../Schemas/AdminFuelReport')
const AdminFuel = mongoose.model('Admin Fuel');

// Report Fuel 
const createFuelReport = async (Request, Response) => {
    try {
        const { registration, fuelType, date, cost, km } = Request.body
        const attachment = Request.file ? Request.file.path : null;
        const userId = Request.user.Id;

        const newFuelReport = AdminFuel({
            userId,
            registration,
            fuelType,
            date,
            cost,
            km,
            attachment
        });
        await newFuelReport.save();
        return Response.status(200).json({ message: "Data has been logged" });
    } catch (error) {
        return Response.status(500).json({ message: 'Error', error: error.message });
    }
}

// delete Fuel Log

const delete_fuel_log = async (Request, Response) => {
    try {
        const { id } = Request.params
        const deletefuelLog = AdminFuel.findByIdAndDelete(id);
        if (!deletefuelLog) {
            return Response.status(404).json({ message: "Fuel Log not found" });
        }
        return Response.status(200).json({ message: "Fuel Log has been deleted" });
    } catch (error) {
        return Response.status(500).json({ status: 'Error', data: error.message });

    }
}

// Update fuel log 

const update_fuel_log = async (Request, Response) => {
    try {
        const { registration, fuelType, date, cost, km } = Request.body;
        const updatedFuelLog = await AdminFuel.findOneAndUpdate(
            { registration },
            { fuelType, date, cost, km },
            { new: true, runValidators: true }
        )

        if (!updatedFuelLog) {
            return Response.status(404).json({ message: "fuel log Not found" });
        }

        return Response.status(200).json({ message: "Fuel log updated" });

    } catch (error) {
        return Response.status(500).json({ status: 'Error', error: error.message });
    }
}

// get Fuel Report 

const getfuelReport = async (Request, Response) => {
    try {
        const userId = Request.user.Id;
        const fuelLog = await AdminFuel.find({ userId });

        if (!fuelLog) return Response.status(400).json({ message: 'No fuel Log Found' });
        return Response.status(200).json({ assets: assets });

    } catch (error) {
        return Response.status(500).json({ status: 'ERROR', data: error.message });
    }
}

module.exports = {
    createFuelReport,
    update_fuel_log,
    delete_fuel_log,
    getfuelReport,
}