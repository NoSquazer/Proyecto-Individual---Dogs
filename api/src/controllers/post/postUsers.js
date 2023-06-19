const { User } = require("../../db.js");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "MISING_DATA" });
    }

    const [newUser, isCreated] = await User.findOrCreate({
      where: { [Op.or]: [{ username }, { email }] },
      defaults: { username, email, password },
    });

    if (isCreated) {
      return res.status(201).json({
        message: "User created succesfully! Loggin in...",
        accessToken: true,
        userId: newUser.id,
      });
    } else {
      return res.status(409).json({ error: "User already exist!" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
