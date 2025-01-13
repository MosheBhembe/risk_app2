const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('../Schemas/registrationData');

const Register = mongoose.model('Registration Data');

const user_Data = async (Request, Response) => {
    const { token } = Request.body;

    try {

        const user = jwt.verify(token, process.env.JWT_TOKEN);
        const userEmail = user.email;
        const userData = await Register.findOne({ Email: userEmail });

        if (!userData) {
            return Response.status(404).send({ status: 'error', data: 'User not found' });
        }

        return Response.status(200).send({ status: 'ok', data: userData });

    } catch (error) {
        return Response.status(500).send({ status: 'error', data: 'internal Server error' });
    }
}

module.exports = user_Data;

