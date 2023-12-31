const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) res.status(400).send({ message: "Invalid username/password" });

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword)
    res.status(400).send({ message: "Invalid username/password" });

  const { password: hashedPassword, _id, ...userDetails } = user.toJSON();
  const token = jwt.sign(
    {
      ...userDetails,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2 days" }
  );

  res.status(200).send({
    user: userDetails,
    token,
  });
};

const register = async (req, res) => {
  const { username, password, firstName, lastName, role_id } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    res.status(400).send({ message: "Username taken" });
  } else {
    if ((!username || !password || !firstName || !lastName, !role_id)) {
      res.status(400).send({ message: "all fields are required" });
    }

    try {
      const user = new User({
        username,
        password,
        firstName,
        lastName,
        role_id,
      });

      await user.save();

      return res.status(200).send({ user });
    } catch (e) {
      return res.status(500).send({ error: e });
    }
  }
};

module.exports = {
  login,
  register,
};
