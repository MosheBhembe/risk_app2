const mongoose = require('mongoose');
require('../Schemas/emails');

const Email = mongoose.model('emails');

const getAllEmails = async (Request, Response) => {
    try {
        const userId = Request.user.userId
        const emails = await Email.find({ createdBy: userId });
        Response.status(200).json({ status: 'ok', data: emails });
    } catch (error) {
        console.log('Error fetching emails: ', error);
        return Response.json({ message: `Failed to fetch emails` });
    }
}

module.exports = getAllEmails; 