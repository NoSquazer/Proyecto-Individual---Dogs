const { Dog, Favorite } = require("../../db.js");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "Missing data!" });

    const dogDestroy = await Dog.findByPk(id);

    if (dogDestroy) {
      await Favorite.destroy({
        where: { DogId: id },
      });
      await Dog.destroy({
        where: { id },
      });
    } else return res.status(404).json({ error: "Not found!" });

    return res.json({ message: "Dog deleted!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
