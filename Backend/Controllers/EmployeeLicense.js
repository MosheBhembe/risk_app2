const mongoose = require('mongoose');

require('../Schemas/registrationData');
const Register = mongoose.model("Registration Data");

require('../Schemas/EmployeeLicense');
const EmployeeLicense = mongoose.model("Employee License");


// Create Employee License
const CreateEmployeeLicenseLog = async (Request, Response) => {
    const { } = Request.body;
    const document = Request.file ? Request.path : null;
    const userId = Request.user.id;

    const Employee = await Register.findById(userId);

}

module.exports = { CreateEmployeeLicenseLog }