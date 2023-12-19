const mongoose = require("mongoose");

const profileImageSchema = new mongoose.Schema({
  file: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Profile = mongoose.model("Profile", profileImageSchema);

module.exports = Profile;
