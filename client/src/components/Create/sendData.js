import axios from "axios";

let id = 500;
const sendData = async (dogData, setAlert) => {
  const { name, origin, image, temperamentList, height, weight, lifeSpan } =
    dogData;

  try {
    const { data } = await axios.post("http://localhost:3001/dogs", {
      id,
      name,
      origin: origin ? origin : "unknown",
      image: image
        ? image
        : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png",
      temperament: temperamentList,
      height: `${height.minHeight} - ${height.maxHeight}`,
      weight: `${weight.minWeight} - ${weight.maxWeight}`,
      life_span: `${lifeSpan.minLifeSpan} - ${lifeSpan.maxLifeSpan}`,
    });
    id = id + 1;

    return setAlert({
      status: 200,
      message: data.message,
    });
  } catch (error) {
    console.log(error);
    return setAlert({ status: 400, message: "Failed to submit data." });
  }
};

export default sendData;
