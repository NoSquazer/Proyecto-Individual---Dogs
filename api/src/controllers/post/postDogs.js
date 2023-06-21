const { Dog, Temperament } = require("../../db.js");

module.exports = async (req, res) => {
  try {
    const { id, name, origin, height, weight, life_span, image, temperament } =
      req.body;

    if (!image || !name || !height || !weight || !life_span || !temperament)
      return res.status(400).json({ error: "Missing data!" });

    const [newDog, isCreated] = await Dog.findOrCreate({
      where: {
        name,
      },
      defaults: {
        id,
        origin,
        height,
        weight,
        life_span,
        image,
      },
    });

    if (isCreated) {
      if (temperament && temperament.length) {
        const temperamentToAdd = await Temperament.findAll({
          where: {
            name: temperament,
          },
        });

        await newDog.addTemperaments(temperamentToAdd);
      }
      return res.status(201).json({ message: "Dog created successfully!" });
    } else return res.status(409).json({ error: "Dog already exist!" });
  } catch ({ message }) {
    return res.status(500).json({ error: message });
  }
};
