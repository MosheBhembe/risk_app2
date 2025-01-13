const mongoose = require('mongoose');
require('../Schemas/registrationData');
const bcrypt = require('bcryptjs');

const Register = mongoose.model('Registration Data');

const registerUser = async (Request, Response) => {
    const { name, surname, email, password, confirmPassword } = Request.body;
    const encrpytedPassword = await bcrypt.hash(password, 10);
    const encrpytedPasswordConfirmation = await bcrypt.hash(confirmPassword, 10);
    const RegisteredUser = await Register.findOne({ Email: email });

    if (RegisteredUser) {
        Response.send({ data: 'This email is already registered' });
    }

    try {
        await Register.create({
            Names: name,
            Surname: surname,
            Email: email,
            PAssword: encrpytedPassword,
            confirmPassword: encrpytedPasswordConfirmation
        })
        Response.send({ status: 'ok', data: 'User Created' });
    } catch (error) {
        Response.send({ status: 'Error', data: error });
    }
}

const delete_user = async (Request, Response) => {
    const { email } = Request.body;
    const user = await Register.findOneAndDelete({ Email: email });
    try {
        if (!user) {
            Response.status(404).json({ message: "There is no user with that email" });
        }
        Response.status(200).json({ status: "Success", message: "User deleted" });
    } catch (error) {
        return Response.status(500).json({ status: "error", message: error.message })
    }
}

module.exports = { registerUser, delete_user };
