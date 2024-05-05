const mongoose = require('mongoose')
require('dotenv').config();

const  connectDB = ()=>{
    console.log("connected db");
    return mongoose.connect(process.env.MONGODB_URI)
}
module.exports = connectDB;