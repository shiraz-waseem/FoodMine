// import { connect, ConnectOptions } from "mongoose";
const mongoose = require("mongoose");

// The ! tells it will ve always avaible
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("Connection successfully");
  })
  .catch((e: any) => {
    console.log(e);
  });
