const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema({
  image: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "user" },
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  email: String,
  phone: { type: String, required: true, unique: true },
  Note: String,
  noTrash: { type: Boolean, default: false },
});

const contact = mongoose.model("contact", contactSchema);

module.exports = contact;
