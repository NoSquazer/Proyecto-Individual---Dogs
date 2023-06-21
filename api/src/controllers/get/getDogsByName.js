const axios = require("axios");
const { Dog, Temperament } = require("../../db");
const { Op } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const { api_key } = process.env;

module.exports = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) return res.status(400).json({ error: "Missing data!" });

    const dbDogsList = await Dog.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: { model: Temperament },
    });

    const { data } = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${api_key}`
    );
    const apiDogsList = data.filter((dog) => {
      return dog.name.toLowerCase().includes(name.toLowerCase());
    });

    if (!apiDogsList.length && !dbDogsList.length)
      return res.status(404).json({ error: "Not found!" });

    const newDogsFromAPI = apiDogsList.map((dog) => {
      return {
        id: dog.id,
        name: dog.name,
        origin: dog.origin ? dog.origin : "unknown",
        height: dog.height.metric,
        weight: dog.weight.metric,
        life_span: dog.life_span,
        image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg?api_key=${api_key}`,
        temperament: dog.temperament ? dog.temperament : "unknown",
      };
    });
    const newDogsFromDB = dbDogsList.map((dog) => {
      return {
        id: dog.id,
        name: dog.name,
        origin: dog.origin ? dog.origin : "unknown",
        height: dog.height,
        weight: dog.weight,
        life_span: dog.life_span,
        image: dog.image
          ? dog.image
          : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png",
        temperament: dog.Temperaments
          ? dog.Temperaments.map((temperament) => {
              return temperament.name;
            })
          : "unknown",
      };
    });

    const uniqueDogsFromDB = newDogsFromDB.filter((dbDog) => {
      return !newDogsFromAPI.some((apiDog) => apiDog.name === dbDog.name);
    });

    return res.status(200).json([...newDogsFromAPI, ...uniqueDogsFromDB]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
