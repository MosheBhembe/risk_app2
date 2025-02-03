const mongoose = require('mongoose');
require('../Schemas/DriverData');

const Driver = mongoose.model('Driver');

// create driver
const CreateDriver = async (Request, Response) => {
    try {
        const userId = Request.userId;
        const image = Request.file;
        const { name, surname, idNumber, licenceType, licenceRegistrationDate, licenceExpirydate } = Request.body

        const RegisteredDriver = Driver.findOne({ IDNumber: idNumber });

        if (RegisteredDriver) {
            return Response.status(400).json({ message: 'Driver has already been registered' });
        }

        const NewDriver = Driver({
            Name: name,
            Surname: surname,
            IDNumber: idNumber,
            LicenceType: licenceType,
            LicenceRegistrationDate: licenceRegistrationDate,
            LicenceExpiryDate: licenceExpirydate,
            Image: image
        })

        await NewDriver.save();
        return Response.status(200).json({ message: 'Driver Added' })

    } catch (error) {
        return Response.status(500).json({ status: 'Error', data: error.message });
    }
}

const GetAllDrivers = async (Request, Response) => {
    try {
        const drivers = await Driver.find().select('-userId');

        if (!drivers) return Response.status(404).json({ message: 'No drivers found' });
        return Response.status(200).json({ drivers: drivers });

    } catch (error) {
        return Response.status(500).json({ status: 'Error', message: error.message });
    }
}

// delete driver
const DeleteDriver = async (Request, Response) => {
    try {
        const { identityNumber } = Request.body;
        const driver = await Driver.findOneAndDelete({ IDNumber: identityNumber });

        if (!driver) return Response.status(404).json({ message: "No use exist" });
        return Response.status(200).json({ message: "Driver deleted" });

    } catch (error) {
        return Response.status(500).json({ status: 'Error', data: error.message });
    }
}
// update driver
const UpdateDriver = async (Request, Response) => {
    try {
        const { name, surname, idNumber, licenceType, licenceExpiryDate } = Request.body;

        const updatedDriver = await Driver.findOneAndUpdate(
            { idNumber },
            { name, surname, licenceType, licenceExpiryDate },
            { new: true, runValidators: true }
        );

        if (!updatedDriver) return Response.status(404).json({ message: 'Driver not found' });

        return Response.status(200).json({ message: 'Driver Updated Successfully' });

    } catch (error) {
        return Response.status(500).json({ status: 'Error', message: error.message });
    }
}


module.exports = { CreateDriver, DeleteDriver, GetAllDrivers, UpdateDriver }; 