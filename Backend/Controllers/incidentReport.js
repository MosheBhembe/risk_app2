const mongoose = require('mongoose');
const transporter = require('../Middleware/nodemailerconfig.js');


require('../Schemas/ReportData.js');
require('../Schemas/emails.js');

require('../Schemas/registrationData.js');
const Report = mongoose.model('ReportData');
const Email = mongoose.model('emails');
const Register = mongoose.model('Registration Data');



const incidentReport = async (Request, Response) => {
  const { incidentNumber, nameSurname, dateTime, incidentType, place, description, equipment, peopleInvolved } = Request.body;
  const userId = Request.user.id;
  const userData = await Register.findById(userId).select('Email companyId');

  if (!userData || !userData.companyId) {
    return Response.status(400).json({ status: "error", message: "Company ID not found." });
  }
  console.log("UserId", userId);
  const userEmail = userData.Email;
  const companyId = userData.companyId;

  try {
    const newReport = Report({
      createdBy: userId,
      companyId: companyId,
      IncidentNumber: incidentNumber,
      Names: nameSurname,
      DateTime: dateTime,
      selectedOptions: incidentType,
      Place: place,
      Description: description,
      Equipment: equipment,
      PeopleInvolved: peopleInvolved
    });

    await newReport.save();
    return Response.status(200).json({ status: 'ok', data: "Report Data Created and has been sent to admin Successfully" });
  } catch (error) {
    Response.status(500).json({ status: "error", data: error.message });
  }
};

// update


// get Incident report

const getIncidentReport = async (Request, Response) => {
  try {
    // const { userId } = Request.query;
    const userId = Request.user.id;
    if (!userId) {
      return Response.status(400).json({ status: "error", message: "User ID is required" });
    }

    const user = await Register.findById(userId);
    if (!user || !user.companyId) {
      return Response.status(400).json({ message: "User or company not found" });
    }

    const incidentReports = await Report.find({ companyId: user.companyId });
    if (!incidentReports.length) {
      return Response.status(404).json({ message: "No incident reports found" });
    }

    return Response.status(200).json({ status: 'ok', data: incidentReports });
  } catch (error) {
    return Response.status(500).json({ status: "error", data: error.message });
  }
}

module.exports = { incidentReport, getIncidentReport };  