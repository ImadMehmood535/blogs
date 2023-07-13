const mongoose = require("mongoose")

const {MONGO_CONNECTION_STRING} = require("../config/index")

const connectDB =  async () =>{
 try{
     const conn = await mongoose.connect(MONGO_CONNECTION_STRING);
     console.log(`Database connected on host ${conn.connection.host}`);
 }
 catch(error){
    console.log(`Error: ${error}`);
 }

}

module.exports = connectDB;