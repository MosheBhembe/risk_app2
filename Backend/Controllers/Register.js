const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

require('../Schemas/registrationData');
const Register = mongoose.model('Registration Data');

const registerUser = async (req, res) => {
    try {

        const { Name, Surname, Email, Password, ConfirmPassword } = req.body;
        const RegisteredUser = await Register.findOne({ Email: Email });
        const hashedPassword = await bcrypt.hash(Password, 10);
        const encryptedConfirmPassword = await bcrypt.hash(ConfirmPassword, 10);

        if (RegisteredUser) {
            Response.send({ message: "USER ALREADY EXISTS" });
        }

        await Register.create({
            Name: Name,
            Surname: Surname,
            Email: Email,
            Password: hashedPassword,
            ConfirmPassword: encryptedConfirmPassword
        })
        res.send({ status: "ok", data: 'User Created ' });

    } catch (error) {
        console.log("data: ", req.body);
        console.log("headers: ", req.headers);
        console.log(error);
        res.status(500).send({ status: 'Error', data: error.message });
    }
};

const delete_user = async (Request, Response) => {
    const { email } = Request.body;
    try {
        const user = await Register.findOneAndDelete({ Email: email });
        if (!user) {
            return Response.status(404).json({ message: "There is no user with that email" });
        }
        return Response.status(200).json({ status: "success", message: "User deleted" });
    } catch (error) {
        return Response.status(500).json({ status: "error", message: error.message });
    }
};

module.exports = { registerUser, delete_user };
