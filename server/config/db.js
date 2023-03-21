const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const conncetDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to the database: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = conncetDB;
