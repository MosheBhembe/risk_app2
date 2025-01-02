const mongoose = require('mongoose'); 
const emailConfigurations = require('../Middleware/nodemailerconfig');
const companyEmail = require('../Middleware/companyEmail.js');  
require('../Schemas/TyreChangeData')
require('../Schemas/registrationData'); 
require('../Schemas/emails'); 

const Register = mongoose.model('Registration Data'); 
const TyreChange = mongoose.model('Tyre change report'); 
const Email = mongoose.model('emails'); 

const tyre = async (Request, Response) => {
    const {email, registrationNumber, burstData, dateAndTime } = Request.body; 
    
    const userEmailAddress = Register.findOne({Email: email}).select('Email');

    const emailTyreChangeData = {
        from: userEmailAddress,
        to: companyEmail, 
        subject: `tyre change report from ${userEmail} date: ${Date.now()}`, 
        text: `Registration Number: ${registrationNumber}\n Burst Tyre: ${burstData}\n Date of Incident: ${dateAndTime}`
    }
    
    emailConfigurations.sendMail(emailTyreChangeData, async (error, info) => {
        if (error) {
            console.log('error sending email', error);
            Response.status({ status: "error", message: 'error sending message' });
        }
        console.log('Email sent', info.response);
        Response.status({ status: 'ok', message: 'email has been send successfully' })
    }); 


    try {
        const email= new Email(emailTyreChangeData); 
        await email.save(); 
        console.log('email saved'); 
    } catch (error) {
        console.log('error saving email', error); 
    }
        
    try {
        await TyreChange.create({
            Registration: registrationNumber,
            Burst: burstData,
            TimeandDate: dateAndTime
        })
        Response.send({ status: 'ok', data: 'Tyre change data created' });
    } catch (error) {
        Response.send({ status: 'error', data: error });
    }
}

module.exports = tyre; 