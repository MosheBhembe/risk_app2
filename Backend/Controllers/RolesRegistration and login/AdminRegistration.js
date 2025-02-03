const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

require('../../Schemas/AdminRegistration');
const Admin = mongoose.model("Admin Register");

const AdminRegistration = async (Request, Response) => {
    try {
        const { name, surname, IdNumber, email, companyName, role, password } = Request.body;

        const registeredAdmin = await Admin.findOne({ Identity: IdNumber });
        const hashPass = await bcrypt.hash(password, 10);


        if (registeredAdmin) {
            Response.status(401).send('ADMIN USER ALREADY REGISTERED');
        }

        const newAdminUser = Admin({
            Name: name,
            Surname: surname,
            Identity: IdNumber,
            Email: email,
            Company: companyName,
            Role: role,
            Password: hashPass
        });

        await newAdminUser.save();
        return Response.status(200).json({ status: "ok", message: "User Created" });

    } catch (error) {
        return Response.status(500).json({ status: "Error", error: error.message });
    }
}

module.exports = AdminRegistration; 