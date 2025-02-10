const mongoose = require('mongoose');
const transporter = require('../Middleware/nodemailerconfig');
const companyEmail = require('../Middleware/companyEmail');

require('../Schemas/ConsumptionData');
const consumptionData = mongoose.model('consumptionData');

require('../Schemas/registrationData');
const Register = mongoose.model('Registration Data');

require('../Schemas/emails');
const Email = mongoose.model('emails');

const fuel_data = async (Request, Response) => {
    const { regNumber } = Request.body;
    const image = Request.file ? Request.file.path : null;

    const user_email = await Register.findOne().select('Email');
    const userId = Request.user.Id;

    if (!image) {
        return Response.status(400).json({ message: 'No Image uploaded' });
    }

    const newFuelData = consumptionData({
        createdBy: userId,
        Registration: regNumber,
        Image: image

    })
    await newFuelData.save();
    Response.status(200).json({
        message: 'Data sent'
    })

    // Create the email body sructure
    const emailReportData = {
        from: user_email.Email,
        to: "vsmlb96@gmail.com",
        subject: `Fuel Consumption report: Registration #: ${regNumber}`,
        text: `Registration: ${regNumber}, Image Path: ${image}`,
        attachments: [
            {
                filename: path.basename(image),
                path: image,
                cid: 'unique@nodemailer.com'
            }
        ]
    };

    try {
        transporter.sendMail(emailReportData, async (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                return res.status(500).send({ status: 'error', message: 'Email was not sent' });
            }
            console.log('Email sent', info.response);
            Response.send({ status: 'ok', message: 'Fuel data stored and email sent' });

            // Save the email data (optional)
            try {
                const email = new Email(emailReportData);
                await email.save();
                console.log('Email data saved');
            } catch (saveError) {
                console.log('Error saving email data:', saveError);
            }
        });
    } catch (error) {
        console.log('Error saving fuel data:', error);
        res.status(500).send({ status: 'error', data: error.message });
    }
}

module.exports = fuel_data; 