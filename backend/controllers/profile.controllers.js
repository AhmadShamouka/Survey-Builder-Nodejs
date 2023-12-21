const Profile = require("../models/profile.model");
const User = require("../models/user.model");

const uploadImage = async (req, res) => {
  try {
    const { file } = req.body;
    try {
      const upload = await Profile.create({
        file,
        userId: req.user._id,
      });
      return res.status(200).send({ upload });
    } catch (error) {
      return res.status(500).send({ error });
    }
  } catch (error) {
    return "Unauthroized";
  }
};
module.exports = {
  uploadImage,
};
