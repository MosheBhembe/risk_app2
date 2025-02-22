const mongoose = require('mongoose');

require('../Schemas/Inspactions');
const Inspection = mongoose.model("Inspection");

require('../Schemas/registrationData');
const Register = mongoose.model("Registration Data");


const createInspection = async (Request, Response) => {
    const { person, inspectionName, frequency, dateDone } = Request.body;
    const userId = Request.user.id;
    const user = await Register.findById(userId).select("Email companyId");


    if (!user || !user.companyId) {
        return Response.status(400).json({ message: "Email or Company ID Not found" });
    }

    const companyId = user.companyId;
    try {
        const newInspectionReport = Inspection({
            userId,
            companyId,
            PersonResposible: person,
            InspectionName: inspectionName,
            Frequency: frequency,
            DateDone: dateDone
        })

        await newInspectionReport.save();
        return Response.status(200).json({ status: ok, data: "Inspection Sent to Employee" });
    } catch (err) {
        return Response.status(500).json({ status: "error", message: err.message });
    }

}


const getInspectionReports = async (Request, Response) => {
    try {
        const userId = Request.user.id;
        if (!userId) {
            return Response.status(400).json({ status: "error", message: "User ID is required" });
        }

        const user = await Register.findById(userId);
        if (!user || !user.companyId) {
            return Response.status(400).json({ message: "User ID or company NOT found" });
        }
        const fetchInspections = await Inspection.find({ companyId: user.companyId });
        if (!fetch)
            return Response.status(2002)
    } catch (error) {

    }
}

module.exports = {
    createInspection,
    getInspectionReports
}