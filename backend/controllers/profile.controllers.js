const Profile = require("../models/profile.model");
const User = require("../models/user.model");

const uploadImage = async (req, res) => {
  const { file } = req.body;
  try {
    const upload = await Profile.create({
      file,
      userId: req.user._id,
    });
    res.status(200).send({ upload });
  } catch (error) {
    res.status(500).send({ error });
  }
};

module.exports = {
  uploadImage,
};
