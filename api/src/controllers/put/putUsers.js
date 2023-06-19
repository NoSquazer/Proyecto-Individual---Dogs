const { User } = require("../../db");

module.exports = async (req, res) => {
  try {
    const { id, ...updates } = req.body;

    const userToUpdate = await User.findByPk(id);

    if (!userToUpdate) return res.status(404).json({ error: "Not found!" });

    for (const prop in updates) {
      if (prop in userToUpdate) {
        userToUpdate[prop] = updates[prop];
      }
    }

    await userToUpdate.save();

    return res.json({ message: "User updated succesfully!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
