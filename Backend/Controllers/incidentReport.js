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

    const userId = Request.user.Id;

    const userEmail = Register.findOne({ createdBy: userId }).select('Email')

    const emailInfo = `${name}, ${email}, ${location}, ${assets}, ${dateTime}`;
    const sendInfo = {
        to: "vsmlb96@gmail.com",
        from: userEmail,
        subject: 'Incident Report',
        text: emailInfo,
    }

    transporter.sendMail(sendInfo, async (error, info) => {
        if (error) {
            Response.status(502).json({ status: "error", message: 'Your email could not be sent' })
        }
        Response.status(200).json({ status: 'ok', message: 'Email has been sent to management' });

        try {
            const email = new Email(sendInfo);
            await email.save();
            Response.status({ status: 'ok', message: 'Email Data Saved' });
        } catch (error) {
            Response.status({ status: 'Error', message: `Error saving email Data: ${error}` });
        }
    })

    try {
        await Report.create({
            createdBy: userId,
            name: name,
            email: email,
            location: location,
            selectedOptions: selected,
            assets: assets,
            dateTime: dateTime
        });
        Response.send({ status: 'ok', data: "Report Data Created" });
    } catch (error) {
        Response.status(500).send({ status: "error", data: error });
    }
}

// get Incident report

const getIncidentReport = async (Request, Response) => {
    try {

        const userId = Request.user.Id;
        const incidentReport = await Report.find({ createdby: userId });

        if (!incidentReport) {
            Response.status(404).json({ status: "error", message: 'No Incident Report Found' });
        }

        Response.status(200).json({ status: 'ok', data: incidentReport });

    } catch (error) {
        console.log(error)
        return Response.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }
}

module.exports = { incidentReport, getIncidentReport };  