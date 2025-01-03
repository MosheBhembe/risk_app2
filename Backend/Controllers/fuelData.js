const mongoose = require('mongoose'); 
const emailConfigurations = require('../Middleware/nodemailerconfig'); 
const companyEmail = require('../Middleware/companyEmail');

require ('../Schemas/ConsumptionData'); 
const FuelData = mongoose.model('consumptionData');

require('../Schemas/registrationData'); 
const Register = mongoose.model('Registration Data'); 

require('../Schemas/emails'); 
const Email = mongoose.model('emails'); 


const fuel_data = async (Request, Response) => {
    const { name, regNumber, amount, cost, date } = Request.body; 
    const image = Request.file ? Request.file.path : null;

    const user_email = Register.findOne().select('Email'); 
    
    if(!image){
        return Response.status(400).json({message: 'No Image uploaded'});
    }

    // Create the email body structure
    const emailReportData = {
        from: user_email,
        to: companyEmail, 
        subject: `Fuel Consumption report from ${name}: Registration #: ${regNumber}`, 
        text: `Name: ${name}, Registration: ${regNumber}, Amount: ${amount}, Cost: ${cost}, Date: ${date}, Image Path: ${image}`, 
        attachments: [
            {
                filename: path.basename(image), 
                path: image,
                cid: 'unique@nodemailer.com' 
            }
        ]    
    }; 

    try {
        emailConfigurations.sendMail(emailReportData, async (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                return res.status(500).send({ status: 'error', message: 'Email was not sent' });
            }
            console.log('Email sent', info.response);
            res.send({ status: 'ok', message: 'Fuel data stored and email sent' });

            // Save the email data (optional)
            try {
                const email = new Email(emailReportData);
                await email.save();
                console.log('Email data saved');
            } catch (saveError) {
                console.log('Error saving email data:', saveError);
            }
        });

        await FuelData.create({
            Name: name,
            Registration: regNumber,
            Amount: amount,
            Cost: cost,
            Image: image,
            DateTime: date
        });
        
    } catch (error) {
        console.log('Error saving fuel data:', error);
        res.status(500).send({ status: 'error', data: error.message });
    }
}

module.exports = fuel_data; 