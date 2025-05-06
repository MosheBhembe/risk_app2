const mongoose = require('mongoose');

require('../Schemas/Inspactions');
const Inspection = mongoose.model("Inspection");

require('../Schemas/registrationData');
const Register = mongoose.model("Registration Data");

require('../Schemas/AssetLicense');
const AssetLicense = mongoose.model("Asset License");


const createInspection = async (Request, Response) => {
    const { registration_number, inspectionDate, inspectorName, inspectionType, issues, listedIssues, } = Request.body;
    const uploads = Request.file ? Request.file.path : null;
    const userId = Request.user.id;
    const user = await Register.findById(userId).select("Email companyId");
    const registeredAsset = await AssetLicense.findOne({ RegistrationNumber: registration_number });

    if (!user || !user.companyId) {
        return Response.status(400).json({ message: "Email or Company ID Not found" });
    }

    const companyId = user.companyId;

    try {
        const newInspectionReport = Inspection({
            userId,
            companyId,
            registrationId,
            Registration: registration_number,
            InspectionDate: inspectionDate,
            InspectorName: inspectorName,
            InspectionType: inspectionType,
            Issues: issues,
            IssuesDescription: listedIssues,
            Upload: uploads
        })

        await newInspectionReport.save();
        return Response.status(200).json({ status: "ok", data: "Inspection Sent to Employee" });
    } catch (err) {
        return Response.status(500).json({ status: "error", message: err.message });
    }
}

// Update Endpoint
const updateInspections = async (Request, Response) => {
    const { id } = Request.params
    const { registration_number, inspectionDate, inspectorName, inspectionType, issues, listedIssues } = Request.body;

    const uploads = Request.file ? Request.file.path : null;
    const userId = Request.user.id;

    try {
        const inspection = await Inspection.findById(id);

        if (!inspection) {
            return Response.status(404).json({ message: "Inspection item not found" });
        }

        if (inspection.userId.toString() !== userId) {
            return Response.status(403).json({ message: "Unautherised" });
        }

        if (registration_number) inspection.Registration = registration_number;

        if (inspectorName) inspection.InspectorName = inspectorName;
        if (inspectionDate) inspection.InspectionDate = inspectionDate;


        if (inspectionType) inspection.InspectionType = inspectionType;


        if (issues) inspection.Issues = issues;

        if (listedIssues) inspection.IssuesDescription = listedIssues;

        if (uploads) inspection.Upload = uploads;


        await inspection.save();

        return Response.status(200).json({ status: "ok", message: 'Inspection Updated Successfully' })
    } catch (error) {
        console.log('Error Updating Inspections', error)
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
        if (!fetcInspections) {
            return Response.status(404).json({ message: "No inspections" });
        }

        return Response.status(200).json({ message: fetchInspections })
    } catch (error) {

    }
}

module.exports = {
    createInspection,
    getInspectionReports,
    updateInspections
}