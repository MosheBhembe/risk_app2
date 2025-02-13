const mongoose = require('mongoose');
const transporter = require('../Middleware/nodemailerconfig.js');


require('../Schemas/ReportData.js');
require('../Schemas/emails.js');

require('../Schemas/registrationData.js');
const Report = mongoose.model('ReportData');
const Email = mongoose.model('emails');
const Register = mongoose.model('Registration Data');



const incidentReport = async (Request, Response) => {
    const { name, email, location, selected, assets, dateTime } = Request.body;
    const userId = Request.user.id;
    const userData = await Register.findById(userId).select('Email companyId');

    if (!userData || !userData.companyId) {
        return Response.status(400).json({ status: "error", message: "Company ID not found." });
    }
    console.log("UserId", userId);
    const userEmail = userData.Email;
    const companyId = userData.companyId;

    const emailInfo = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          color: #333;
          background-color: #f4f4f4;
          padding: 20px;
        }
        .container {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h2 {
          color: #4CAF50;
        }
        p {
          font-size: 16px;
        }
        .info {
          margin-bottom: 15px;
        }
        .info strong {
          color: #4CAF50;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Incident Report</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Type:</strong> ${selected}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Assets Involved:</strong> ${assets}</p>
        <p><strong>Incident Date and Time:</strong> ${dateTime}</p>
        <br/>
        <p>If you need further assistance, Urgent please attend</p>
      </div>
    </body>
  </html>
`;
    ;
    const sendInfo = {
        to: "vsmlb96@gmail.com",
        from: userEmail,
        subject: 'Incident Report',
        html: emailInfo,
    };

    transporter.sendMail(sendInfo, async (error, info) => {
        if (error) {
            return Response.status(502).json({ status: "error", message: 'Your email could not be sent' });
        }

        try {
            const emailRecord = new Email(sendInfo);
            await emailRecord.save();
        } catch (error) {
            return Response.status(500).json({ status: "error", message: `Error saving email data: ${error}` });
        }

        // return Response.status(200).json({ status: 'ok', message: 'Email has been sent to management and data saved' });
    });

    try {
        const newReport = Report({
            createdBy: userId,
            companyId: companyId,
            name: name,
            email: email,
            location: location,
            selectedOptions: selected,
            assets: assets,
            dateTime: dateTime
        });

        await newReport.save();
        return Response.status(200).json({ status: 'ok', data: "Report Data Created and has been sent to admin Successfully" });
    } catch (error) {
        Response.status(500).json({ status: "error", data: error });
    }
};


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