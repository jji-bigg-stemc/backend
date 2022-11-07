import mongoose from 'mongoose';
const { Schema } = mongoose;

const Club = require("./clubs.model.js")

const userSchema = new Schema({
  username:  String, // String is shorthand for {type: String}
  firstname: String,
  lastname:   String,
  role: String,
  date: { type: Date, default: Date.now },
  meta: {
    clubs: [Club]
  }
});

module.exports = mongoose.model("User", userSchema)