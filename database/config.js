const mongoose = require('mongoose')

const dbConnection = async() =>{

    try {
        await mongoose.connect(process.env.URI_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connection to database ready")
    } catch (error) {
        console.log(error)
        throw new Error("Error connecting with the database");
    }
}

module.exports = {
    dbConnection
}