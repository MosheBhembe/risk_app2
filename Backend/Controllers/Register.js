const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const transporter = require('../Middleware/nodemailerconfig');
require('../Schemas/registrationData');
require('../Schemas/Company');
const Register = mongoose.model('Registration Data');
const Company = mongoose.model('Company');

const autoGeneratedPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let password = "";

    for (let i = 0; i < 6; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
}

const registerUser = async (req, res) => {
    try {
        const { name, surname, idNumber, role, company, cellphone, emails, gender } = req.body;

        const RegisteredUser = await Register.findOne({ Email: emails });

        if (RegisteredUser) {
            return res.status(400).json({ message: "USER ALREADY EXISTS" });
        }

        let companyDoc = await Company.findOne({ name: company });

        if (!companyDoc) {
            companyDoc = new Company({
                name: company
            });
            await companyDoc.save();
        }

        // Generate and hash password
        const generatedPassword = autoGeneratedPassword();
        const hashedPassword = await bcrypt.hash(generatedPassword, 10);

        // Create new user with companyId
        const newUser = await Register.create({
            Name: name,
            Surname: surname,
            IDNumber: idNumber,
            Role: role,
            companyId: companyDoc._id,
            CellPhone: cellphone,
            Email: emails,
            Gender: gender,
            Password: hashedPassword,
        });

        // Sending email with temporary password and company info
        const emailingPasswordInfo = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #black;">Dear ${newUser.Name},</h2>
            <p>We are pleased to inform you that your account has been successfully created in the <strong>RiskBT System</strong>.</p>
            <p>You can now access your account and start using our services to streamline your risk management processes.</p>
        
            <h3>Your Account Details:</h3>
            <ul>
                <li><strong>Email:</strong> ${newUser.Email}</li>
                <li><strong>Temporary Password:</strong> <span style="color: #d9534f;">${generatedPassword}</span></li>
                <li><strong>Position in ${companyDoc.name}:</strong><span style="color: #007bff;"> ${newUser.Role}</span></li>
            </ul>

            <p>Please log in and change your password to something more secure and memorable.</p>
            <p>If you did not request this account or believe this was created in error, please contact our support team immediately at <a href="mailto:support@riskbt.co.za">support@riskbt.co.za</a>.</p>

            <p>Thank you for choosing <strong>RiskBT</strong>. We look forward to serving you!</p>

            <br>
            <p>Best Regards,</p>
            <p><strong>RiskBT Support Team</strong></p>
        </div>
        `;

        const emailOptions = {
            to: newUser.Email,
            from: "vsmlb96@gmail.com",
            subject: `Your RiskBT Account Has Been Successfully Created!`,
            html: emailingPasswordInfo
        };

        transporter.sendMail(emailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ status: 'Error', message: error.message });
            }

            return res.status(200).json({
                status: "ok",
                message: 'User created and email has been sent'
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Error', message: error.message });
    }
};

const delete_user = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await Register.findOneAndDelete({ Email: email });

        if (!user) {
            return res.status(404).json({ status: 'Error', message: 'User not found' });
        }

        res.status(200).json({ status: 'ok', message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Error', message: error.message });
    }
};

const getAllUsers = async (Req, Res) => {
    try {
        const { company } = Req.user;

        if (!company) {
            return Res.status(400).json({ message: "Data not found" });
        }

        const companyDoc = await Company.findOne({ name: company });

        if (!companyDoc) {
            return Res.status(404).json({ message: 'Company not found' });
        }


        const users = await Register.find({ companyId: companyDoc._id });
        return Res.status(200).json(users);

    } catch (err) {
        console.error(err);
        return Res.status(500).json({ message: "Error fetching data" })
    }
}

module.exports = { registerUser, delete_user, getAllUsers };
