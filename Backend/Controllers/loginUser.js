const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 
const mongoose = require('mongoose'); 
require('../Schemas/registrationData'); 


const Register = mongoose.model('Registration Data'); 

const login = async (Request, Response) => {
    
    try {
        const {email, password} = Request.body; 
        const existingUser = await Register.findOne({Email: email}); 

        if (!existingUser){
            return Response.status(401).send({
                error: 'USER DOES NOT EXIST'
            }); 
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.Password); 
        
        if (!isPasswordValid){
            return Response.status(401).send({
                error: 'Invalid Password'
            })
        }

        const token = jwt.sign({email: existingUser.Email}, process.env.JWT_TOKEN); 
        return Response.status(201).send({status: 'ok', data: token});

    } catch (error) {
        console.log(error); 
        return Response.status(500).send('Internal Server Error', error); 
    }
}

module.exports = login; 