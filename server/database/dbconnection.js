const mongoose = require('mongoose');

const dbconnection = async()=>{
    try{
        // database connection string
        const dbconn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database Connected:${dbconn.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}


module.exports = dbconnection