const axios = require("axios");
const { Dog, Temperament } = require("../../db");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const { api_key } = process.env;

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "Missing data!" });

    const { data } = await axios.get(
      `https://api.thedogapi.com/v1/breeds/${id}?api_key=${api_key}`
    );

    if (data.name) {
      const dogFromAPI = {
        id: data.id,
        name: data.name,
        origin: data.origin ? data.origin : "unknown",
        height: data.height.metric,
        weight: data.weight.metric,
        life_span: data.life_span,
        image: `https://cdn2.thedogapi.com/images/${data.reference_image_id}.jpg`,
        temperament: data.temperament ? data.temperament : "unknown",
      };

      return res.status(200).json(dogFromAPI);
    }

    const dogFromDB = await Dog.findOne({
      where: { id },
      include: Temperament,
    });

    if (dogFromDB) {
      const temperamentsList = dogFromDB.Temperaments.map((temperament) => {
        return temperament.name;
      });

      const newDogsFromDB = {
        id: dogFromDB.id,
        name: dogFromDB.name,
        origin: dogFromDB.origin ? dogFromDB.origin : "unknown",
        height: dogFromDB.height,
        weight: dogFromDB.weight,
        life_span: dogFromDB.life_span,
        image: dogFromDB.image,
        temperament: temperamentsList,
      };
      return res.status(200).json(newDogsFromDB);
    } else {
      return res.status(404).json({ error: "Not found!" });
    }
  } catch ({ message }) {
    return res.status(500).json({ error: message });
  }
};
