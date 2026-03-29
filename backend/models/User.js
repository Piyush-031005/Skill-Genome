import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  
  leetcodeId: {
  type: String
},
score: {
  type: Number,
  default: 0
},

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },
  country: String,
  college: String
});

export default mongoose.model("User", UserSchema);