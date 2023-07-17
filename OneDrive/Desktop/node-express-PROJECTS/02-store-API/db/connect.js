const mongoose = require('mongoose');
require('dotenv').config();

// const url = process.env.MONGO_URL;


const connectDB = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
}

module.exports = connectDB