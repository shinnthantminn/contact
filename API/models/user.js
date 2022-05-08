const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: String,
  createAt: { type: Date, Default: Date.now() },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
