const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('../../Schemas/MangerRegistration');

const Manager = mongoose.model("Manager Register");

const loginAsManager = async (Request, Response) => {
    try {
        const { email, password } = Request.body;
        const registeredManager = await Manager.findOne({ Email: email });

        if (!registeredManager) {
            return Response.status(404).send({
                error: 'USER DOES NOT EXIST',
            });
        }

        const isValidPassword = await bcrypt.compare(password, registeredManager.Password);
        if (!isValidPassword) return Response.status(401).send({
            error: 'Invalid Password'
        });

        const token = jwt.sign({ email: registeredManager.Email }, process.env.JSON_TOKEN);
        return Response.status(200).send({
            status: "ok",
            token: token
        })

    } catch (error) {
        return Response.status(500).send('Internal Server Error', error);
    }
}

module.exports = loginAsManager; 