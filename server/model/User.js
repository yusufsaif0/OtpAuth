const mongoose = require("mongoose");

const RegisterUser = new mongoose.Schema(
  {
    fullname: { type: String },

    email: { type: String},

    phone: { type: Number},    
    
    password: { type: String, },

    isVerified:{ type: Boolean, default:false}
    
  },
  { collection: "Users" }
);

const user = new mongoose.model("Users", RegisterUser);

module.exports = user;
