const mongoose = require('mongoose');

require('../Schemas/ReportData');
const Report = mongoose.model("ReportData");

require('../Schemas/registrationData');
const Register = mongoose.model("Registration Data");

require('../Schemas/Incident_Investigation');
const Investigation = mongoose.model('Investigation');

const createInvestigationReport = async (Request, Response) => {
    const { incidentNumber, investigatorName, investigtionTeam, investigationDate, reportedBy, incidentType, incidentDescription, activity, injured_Personnel, company, witnesses, action, cause } = Request.body;

    const userId = Request.user.id;
    const user = await Register.findById(userId);
    const uploads = Request.files && Request.files.length > 0 ? Request.files.map(file => file.path) : [];

    const companyId = user.companyId;
    if (!userId || !companyId) {
        return Response.status(404).json({
            message: "User email or comany not found"
        });
    }

    const incident = await Report.findOne({ IncidentNumber: incidentNumber });
    const incidentId = incident._id;

    if (!incident) {
        return Response.status(404).json({
            message: `No report with Incident Number "${incidentNumber}" was found.`
        })
    }
    try {
        const newInvestigationReport = await Investigation({
            userId,
            companyId,
            IncidentNumber: incidentId,
            InvestigatorName: investigatorName,
            InvestigationTeam: investigtionTeam,
            InvestigationDate: investigationDate,
            ReportedBy: reportedBy,
            IncidentType: incidentType,
            IncidentDescription: incidentDescription,
            Activity: activity,
            InjuredPerson: injured_Personnel,
            Witnesses: witnesses,
            ImmediateAction: action,
            Company: company,
            Cause: cause,
            Images: uploads
        })
        newInvestigationReport.save();
        return Response.status(200).json({
            message: "Investigation Report created successfully",
        })
    } catch (error) {
        console.log(error);
        return Response.status(500).json({
            message: "Error creating investigation report",
        })
    }
}


// update 
const updateInvestigationReport = async (Request, Response) => {

};

// get

const getInvestigationReport = async (Request, Response) => {
    try {
        const userId = Request.user.id;

        if (!userId) {
            return Response.status(404).json({
                message: "User Login required"
            });
        }

        const getUser = await Register.findById(userId);
        if (!getUser || !getUser.companyId) {
            return Response.status(404).json({
                message: "User not found"
            })
        }

        const investigations = await Investigation.find({ companyId: getUser.companyId });
        if (!investigations.length) {
            return Response.status(404).json({
                message: "no Investigations found"
            })
        }

        return Response.status(200).json({
            message: "Investigation Report found",
            reports: investigations
        })

    } catch (error) {
        return Response.status(500).json({
            message: "Error: Internal Server"
        })
    }
};

module.exports = { createInvestigationReport, updateInvestigationReport, getInvestigationReport }; 