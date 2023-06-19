import axios from "axios";

const getFavorites = async (userId) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/dogs/favorites/${userId}`
    );

    const dogIdList = data.map((fav) => {
      return fav.DogId;
    });

    return dogIdList;
  } catch ({ message }) {
    return message;
  }
};

export default getFavorites;
