import axios from "axios";

const getTemperaments = async () => {
  try {
    const { data } = await axios.get("http://localhost:3001/dogs/temperaments");

    const temperamentsList = data.map((temperament) => {
      return temperament.name;
    });

    return temperamentsList;
  } catch (error) {
    return error.message;
  }
};

export default getTemperaments;
