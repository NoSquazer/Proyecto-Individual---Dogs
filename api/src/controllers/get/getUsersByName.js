const { User } = require("../../db");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) return res.status(303).json({ error: "Missing data!" });

    const userNameList = await User.findAll({
      where: { username: { [Op.iLike]: `%${name}%` } },
    });

    if (!userNameList.length) {
      return res.status(404).json({ error: "Not found!" });
    }

    return res.json(userNameList);
  } catch ({ message }) {
    return res.status(500).json({ error: message });
  }
};
