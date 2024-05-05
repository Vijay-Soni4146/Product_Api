const mongoose = require('mongoose')

const  connectDB = ()=>{
    console.log("connected db");
    return mongoose.connect(process.env.MONGODB_URI)
}
module.exports = connectDB;