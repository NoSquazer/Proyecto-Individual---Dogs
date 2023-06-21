const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const { api_key } = process.env;

module.exports = async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${api_key}`
    );

    const dogNamesList = data.map((dog) => {
      return {
        id: dog.id,
        name: dog.name,
        origin: dog.origin ? dog.origin : "unknown",
        height: dog.height.metric,
        weight: dog.weight.metric,
        life_span: dog.life_span,
        image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
        temperament: dog.temperament ? dog.temperament : "unknown",
      };
    });

    return res.status(200).json(dogNamesList);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
