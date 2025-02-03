const mongoose = require('mongoose');
const transporter = require('../Middleware/nodemailerconfig.js');


require('../Schemas/ReportData.js');
require('../Schemas/emails.js');

require('../Schemas/registrationData.js');
const Report = mongoose.model('ReportData');
const Email = mongoose.model('emails');
const Register = mongoose.model('Registration Data');



const incidentReport = async (Request, Response) => {
    const { name, email, location, assets, dateTime } = Request.body;

    const userId = Request.user.userId;

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
            Response.status({ status: "error", message: 'Your email could not be sent' })
        }
        Response.status({ status: 'ok', message: 'Email has been sent to management' });

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
            name: name,
            email: email,
            location: location,
            assets: assets,
            dateTime: dateTime,
            createdBy: userId
        });
        Response.send({ status: 'ok', data: "Report Data Created" });
    } catch (error) {
        Response.status(500).send({ status: "error", data: error });
    }
}

module.exports = incidentReport; 