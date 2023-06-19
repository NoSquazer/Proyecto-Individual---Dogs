const { Dog, Temperament, User } = require("../../db.js");
const axios = require("axios");

module.exports = async (req, res) => {
  try {
    const { userId, dogId } = req.body;

    const user = await User.findByPk(userId);

    if (!user || !dogId) {
      return res.status(400).json({ error: "Missing data!" });
    }

    const dogToFind = await Dog.findByPk(dogId);

    if (!dogToFind) {
      const { data } = await axios.get(`http://localhost:3001/dogs/${dogId}`);
      const dogCreated = await Dog.create({
        id: data.id,
        name: data.name,
        origin: data.origin,
        height: data.height,
        weight: data.weight,
        life_span: data.life_span,
        image: data.image,
      });

      const temperamentToAdd = await Temperament.findAll({
        where: {
          name: data.temperament,
        },
      });

      await dogCreated.addTemperaments(temperamentToAdd);
      await user.addFavoriteDog(dogId);

      return res.status(201).json({ message: "Dog added to favorites!" });
    } else {
      await user.addFavoriteDog(dogToFind);

      return res.status(201).json({ message: "Dog added to favorites!" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
