import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // extra detailes to edit profile
  phone: {
    type: String,
  },
  watsappNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  title: {
    type: String,
  },
  intro: {
    type: String,
  },
  description: {
    type: String,
  },
  github: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  instagram: {
    type: String,
  },
  facebook: {
    type: String,
  },
  twitter: {
    type: String,
  },
  youtube: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
