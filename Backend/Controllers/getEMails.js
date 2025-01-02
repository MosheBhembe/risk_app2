const mongoose = require('mongoose'); 
require('../Schemas/emails'); 

const Emails = mongoose.model('emails'); 

const getAllEmails = async (Response) => {
    try {
        const emails = await Emails.find(); 
        Response.status(200).json({status: 'ok', data: emails}); 
    } catch (error) {
        console.log('Error fetching emails: ', error);
        res.status(500).json({ status: 'error', message: `Failed to fetch emails` });
    }
}

module.exports = getAllEmails; 