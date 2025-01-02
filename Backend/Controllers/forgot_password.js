const jwt = require('jsonwebtoken'); 
const mongoose = require('mongoose'); 
require('../Schemas/registrationData'); 
const emailConfigurations = require('../Middleware/nodemailerconfig.js')

const Register = mongoose.model("Registration Data"); 

const forgotPassword = async (Request, Response) => {
    const { email } = Request.body; 
    
    try {
        const regUser = await Register.findOne({Email: email});

        if (!regUser) {
            return Response.status(404).send({ status: "error", data: "User not found" });
        }

        const token = jwt.sign({ email: regUser.Email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const linkReset = `https://riskbt.com/reset-password?token=${token}`// for now
        
        // Email format
        const emailLink = {
            from: companyEmail,
            to: email,
            subject: 'Reset Password',
            text: `You requested to reset your password. Please click the link that follows to change your RiskBT account password.\n ${linkReset}`
        }

        // Email Service. 
        emailConfigurations.sendMail(emailLink, (error, info) => {
            if (error) {
                Response.send({ status: "error", message: "Could not send email" })
            }
            Response.send({ status: "ok", message: "You link has been sent" })
        })
        
    } catch (error) {
        return Response.status(500).send({ status: 'error', data: `Server error ${error}` });
    }
}

module.exports = forgotPassword;