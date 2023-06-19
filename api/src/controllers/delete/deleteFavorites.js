const { Favorite, Dog } = require("../../db.js");

module.exports = async (req, res) => {
  try {
    const { userId, dogId } = req.query;

    if (!userId || !dogId)
      return res.status(400).json({ error: "Missing data!" });

    const favOjective = await Favorite.findOne({
      where: { UserId: userId, DogId: dogId },
    });

    if (favOjective) {
      await Favorite.destroy({
        where: { id: favOjective.id },
      });
    } else return res.status(404).json({ error: "Not found!" });

    return res.json({ message: "Dog deleted!" });
  } catch ({ message }) {
    return res.status(500).json({ error: message });
  }
};
