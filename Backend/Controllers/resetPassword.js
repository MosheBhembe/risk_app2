const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('../Schemas/registrationData');

const Register = mongoose.model('Registration Data');

const resetPassword = async (Request, Response) => {
    const { token, newPassword, confirmNewPassowrd } = Request.body;
    try {
        const decodedJWT = jwt.verify(token, process.env.JWT_TOKEN);
        const UserEmail = decodedJWT.email;

        const nRegUser = await Register.findOne({ Email: UserEmail });

        if (!nRegUser) {
            return Response.status(404).send({ status: 'error', data: 'User not found' })
        }

        if (newPassword !== confirmNewPassowrd) {
            return Response.status(400).send({ message: 'Password do not match' });
        }

        if (newPassword === nRegUser.Password) {
            return Response.status(400).send({ message: 'This password has already been used. Please use a different password' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        nRegUser.Password = hashedPassword;
        await nRegUser.save();
        return Response.status(200).send({ status: 'ok', data: 'password updated' });

    } catch (error) {
        return Response.status(500).send({ status: 'error', data: 'Internal Server Error' });
    }
}

module.exports = resetPassword;