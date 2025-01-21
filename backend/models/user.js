// backend/models/User.js
// backend/models/User.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if password not modified
  this.password = await bcrypt.hash(this.password, 10); // Hash password
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Export the model
const User = mongoose.model("User", userSchema);
export default User;
