const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

require('../../Schemas/AdminRegistration');

const Admin = mongoose.model('Admin Register');

const loginAsAdmin = async (Request, Response) => {
    try {
        const { email, password } = Request.body;
        const existingAdminUser = await Admin.findOne({ Email: email });

        if (!existingAdminUser) {
            return Response.status(401).send('USER DOES NOT EXIST');
        }

        const validatePassword = await bcrypt.compare(password, existingAdminUser.Password)
        if (!validatePassword) {
            return Response.status(401).send({
                error: "Invalid Password"
            });
        }

        const token = jwt.sign({ email: existingAdminUser.Email }, process.env.JWT_TOKEN);
        return Response.status(200).send({
            status: "ok",
            token: token
        })
    } catch (error) {
        console.log(error);
        return Response.status(500).send('Internal Server Error', error);
    }
}

module.exports = loginAsAdmin;