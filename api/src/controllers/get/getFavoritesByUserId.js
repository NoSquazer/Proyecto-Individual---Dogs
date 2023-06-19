const { Favorite } = require("../../db");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Missing data!" });
    }

    const favoriteList = await Favorite.findAll({
      where: { UserId: id },
    });

    if (!favoriteList.length) {
      return res
        .status(404)
        .json({ error: "The user does not have favorites!" });
    }

    return res.status(200).json(favoriteList);
  } catch ({ message }) {
    return res.status(500).json({ error: message });
  }
};
