const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const { api_key } = process.env;

module.exports = async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${api_key}`
    );

    const dogNamesList = data.map((value) => {
      return { name: value.name };
    });

    return res.status(200).json(dogNamesList);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
