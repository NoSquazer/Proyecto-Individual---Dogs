const { User } = require("../../db.js");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const userToFind = await User.findByPk(id);

    if (!userToFind.username)
      return res.status(404).json({ error: "No users found!" });

    return res.json(userToFind);
  } catch ({ message }) {
    return res.status(500).json({ error: message });
  }
};
