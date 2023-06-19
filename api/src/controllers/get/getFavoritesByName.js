const { Favorite, Dog, User } = require("../../db");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
    const { name, userId } = req.query;

    if (!name || !userId) {
      return res.status(303).json({ error: "Missing data!" });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    const favoriteNameList = await Favorite.findAll({
      where: { UserId: userId },
      include: [
        {
          model: Dog,
          where: { name: { [Op.iLike]: `%${name}%` } },
        },
      ],
    });

    if (!favoriteNameList.length) {
      return res.status(404).json({ error: "Not found!" });
    }

    return res.json(favoriteNameList);
  } catch ({ message }) {
    return res.status(500).json({ error: message });
  }
};
