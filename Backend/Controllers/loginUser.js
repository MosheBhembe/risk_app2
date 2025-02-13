const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('../Schemas/registrationData');


const Register = mongoose.model('Registration Data');

const login = async (Request, Response) => {

    try {
        const { email, password } = Request.body;
        const existingUser = await Register.findOne({ Email: email }).populate('companyId');

        if (!existingUser) {
            return Response.status(404).send({
                error: 'USER DOES NOT EXIST'
            });
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.Password);

        if (!isPasswordValid) {
            return Response.status(401).send({
                error: 'Invalid Password'
            })
        }

        if (!existingUser.companyId || !existingUser.companyId.name) {
            return Response.status(400).json({ message: "Company data is missing or invalid" });
        }
        const token = jwt.sign({ id: existingUser._id, email: existingUser.Email, role: existingUser.Role, company: existingUser.companyId.name }, process.env.JWT_TOKEN);
        return Response.status(200).send({ status: 'ok', data: token });

    } catch (error) {
        console.log(error);
        return Response.status(500).send('Internal Server Error', error.message);
    }
}

module.exports = login; 