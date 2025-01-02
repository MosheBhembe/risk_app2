const mongoose = require('mongoose'); 

const dbconnection = async () => {
    try {
        await mongoose.connect(process.env.mongodb_connection).then(()=>{
            console.log('Database connected'); 
        }).catch((error) => {
            console.log("Couldn't connect to database ", error); 
        })
    } catch (error) {
        console.log('failed', error); 
    }
}

module.exports = dbconnection; 