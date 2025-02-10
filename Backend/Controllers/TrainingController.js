const mongoose = require('mongoose');
require('../Schemas/TrainingLicenseForm');

const Training = mongoose.model('Training License');
const create_license_training = async (Request, Response) => {
    try {
        const userId = Request.user.Id;
        const { Name, Surname, IdNumber, LicenseFrequency, datelastDone, ExpiryDate, Status } = Request.body;
        const document = Request.file ? Request.file.path : null;

        const newTrainingLicense = Training({
            createdBy: userId,
            Name,
            Surname,
            IdNumber,
            LicenseFrequency,
            datelastDone,
            ExpiryDate,
            Status,
            Document: document
        })
        await newTrainingLicense.save();
        return Response.status(200).json({ message: "Data saved Successfully" });
    } catch (error) {
        return Response.status(500).json({ status: 'Error', message: error.message });
    }
}

const get_license_training = async (Request, Response) => {
    try {
        const userId = Request.user.Id;
        const training_license = await Training({ createdBy: userId });

        if (!training_license) return Response.status(400).json({ message: 'No Asset license Found' });
        return Response.status(200).json({ assets: training_license });

    } catch (error) {
        return Response.status(500).json({ status: 'Error', message: error.message });
    }
}

module.exports = {
    create_license_training,
    get_license_training
}