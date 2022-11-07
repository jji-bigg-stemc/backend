import mongoose from 'mongoose';
const { Schema } = mongoose;

const clubSchema = new Schema({
  name:  String, // String is shorthand for {type: String}
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Club", clubSchema)