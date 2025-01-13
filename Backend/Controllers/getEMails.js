const mongoose = require('mongoose');
require('../Schemas/emails');

const Email = mongoose.model('emails');

const getAllEmails = async (Request, Response) => {
    try {
        const emails = await Email.find();
        Response.status(200).json({ status: 'ok', data: emails });
    } catch (error) {
        console.log('Error fetching emails: ', error);
        return Response.json({ message: `Failed to fetch emails` });
    }
}

module.exports = getAllEmails; 