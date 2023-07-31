const { User } = require("../../db.js");

module.exports = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "MISING_DATA" });
    }

    const userToFind = await User.findOne({
      where: { username },
    });

    if (userToFind) {
      if (userToFind.password === password) {
        return res.json({
          message: "Loggin in..",
          accessToken: true,
          userId: userToFind.id,
        });
      } else {
        return res
          .status(400)
          .json({ error: "The username, password or email are wrong!" });
      }
    } else {
      return res.status(404).json({ error: "User not Found!" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
