const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

require('../../Schemas/MangerRegistration');
const Manager = mongoose.model("Manager Register");

const ManagerRegistration = async (Request, Response) => {
    try {
        const { name, surname, idNumber, email, company, role, password } = Request.body;
        const registeredManager = await Manager.findOne({ Identity: idNumber });
        const hash = await bcrypt.hash(password, 10);

        if (registeredManager) return Response.status(401).send("Manager Already Exists");

        const newManager = Manager({
            Name: name,
            Surname: surname,
            Identity: idNumber,
            Email: email,
            CompanyName: company,
            Role: role,
            Password: hash
        })

        await newManager.save();
        return Response.status(200).json({ message: "User Created" });

    } catch (error) {
        return Response.status(500).json({ status: "Error", error: error.message });
    }
}

module.exports = ManagerRegistration; 