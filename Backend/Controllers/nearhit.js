const mongoose = require('mongoose'); 
const emailConfigurations = require('../Middleware/nodemailerconfig.js');
const companyEmail = require('../Middleware/companyEmail.js'); 


require('../Schemas/NearHitData'); 
const NearHit = mongoose.model('HitData'); 
require('../Schemas/registrationData.js'); 
const Register = mongoose.model('Registration Data');
require('../Schemas/emails.js'); 
const Email = mongoose.model('emails'); 



const Hit = async (Request, Response) => {
    const {name, location, description, assets, date} = Request.body;
    const userEMail = Register.findOne().select('Email'); 

    const emailNearHitData = {
        from:userEMail, 
        to: companyEmail, 
        subject: `Near Hit Report from ${userEMail} date: ${Date.now()}`, 
        text: `Name: ${name} \n Location: ${location} \n Assets: ${assets} \n Description: ${description} \n Date: ${date}`
    }

    emailConfigurations.sendMAil(emailNearHitData, async (error, info) => {
        if(error){
            console.log("error sending email", error); 
            return Response.json({status: 'error', message: 'emau was not sent'}); 
        }
        console.log('Email sent', info.Response); 
        Response.json({status: 'ok', message: 'Your report has been sent'}); 
        try {
            const email = new Email(emailNearHitData); 
            await email.save();
            console.log('Email data saved'); 
        } catch (error) {
          console.log('error savin email', error);   
        } 
    })

    try {
        await NearHit.create({
            Name: name,
            Location: location,
            Equipment: assets,
            Description: description, 
            Date: date
        })
        Response.send({status: 'ok', data: 'Near Hit data created'}); 

    } catch (error) {
        Response.send({ status: 'error', data: error });
    }
}

module.exports = Hit;