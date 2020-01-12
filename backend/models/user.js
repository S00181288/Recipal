const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

//plugins are extra funcitonality that moongoose will apply to the schema
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
