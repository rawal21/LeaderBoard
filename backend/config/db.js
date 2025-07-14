import mongoose  from "mongoose";

const ConnectDb =  async() =>{
  try{

    await  mongoose.connect(process.env.MONGO_URL)
    console.log("Connected to the dataBase");

    }
    catch(error)
    {
         console.error("Database connection error:", error);
    }
}

export default ConnectDb;