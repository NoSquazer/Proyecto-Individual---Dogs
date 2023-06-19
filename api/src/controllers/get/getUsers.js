const { User } = require("../../db.js");

module.exports = async (req, res) => {
  try {
    const usersList = await User.findAll();

    if (!usersList.length)
      return res.status(404).json({ error: "No users found!" });

    return res.json(usersList);
  } catch ({ message }) {
    return res.status(500).json({ error: message });
  }
};
