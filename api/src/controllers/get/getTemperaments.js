const axios = require("axios");
const { Temperament } = require("../../db.js");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const { api_key } = process.env;

module.exports = async (req, res) => {
  try {
    const temperamentsList = await Temperament.findAll();

    if (temperamentsList.length) return res.status(200).json(temperamentsList);
    else {
      const { data } = await axios.get(
        `https://api.thedogapi.com/v1/breeds?${api_key}`
      );
      const apiTemperametsList = data
        .map((value) => {
          return value.temperament;
        })
        .filter((temperament) => temperament);

      const temperamentsToCreate = apiTemperametsList.map((name) => ({ name }));

      const savedTemperaments = await Temperament.bulkCreate(
        temperamentsToCreate
      );
      return res.status(200).json(savedTemperaments);
    }
  } catch ({ message }) {
    return res.status(500).json({ error: message });
  }
};
