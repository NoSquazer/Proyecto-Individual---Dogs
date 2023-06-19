const { User, Favorite } = require("../../db.js");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "Missing data!" });

    const userDestroy = await User.findByPk(id);

    if (userDestroy) {
      await Favorite.destroy({
        where: { DogId: id },
      });
      await User.destroy({
        where: { id },
      });
    } else return res.status(404).json({ error: "Not found!" });

    return res.json({ message: "User deleted!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
