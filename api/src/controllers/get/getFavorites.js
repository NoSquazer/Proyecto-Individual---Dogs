const { Favorite } = require("../../db.js");

module.exports = async (req, res) => {
  try {
    const favoritesList = await Favorite.findAll();

    if (!favoritesList.length) {
      return res.status(404).json({ error: "There are no dogs in favorites!" });
    }

    return res.json(favoritesList);
  } catch ({ message }) {
    return res.status(500).json({ error: message });
  }
};
