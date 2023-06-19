import axios from "axios";

const getData = async (id, setDog) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/dogs/${id}`);

    setDog(data);
  } catch (error) {
    return console.log(error);
  }
};

export default getData;
