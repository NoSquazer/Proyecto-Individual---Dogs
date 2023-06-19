const validateForm = (
  { name, origin, image, height, weight, lifeSpan },
  setError
) => {
  const newError = {
    name: { isInvalid: "", lengthInvalid: "" },
    origin: { isInvalid: "", lengthInvalid: "" },
    image: "",
    height: { isMinor: "", isEmpty: "" },
    weight: { isMinor: "", isEmpty: "" },
    lifeSpan: { isMinor: "", isEmpty: "" },
  };

  if (!/^[a-zA-Z]+$/.test(name)) {
    newError.name.isInvalid = "Please, insert a valid name.";
  }
  if (name.length < 5 || name.length > 30) {
    newError.name.lengthInvalid =
      "The name must be between 5 and 30 characters.";
  }

  if (!/^[a-zA-Z]+$/.test(origin)) {
    newError.origin.isInvalid = "Please enter a valid origin.";
  }
  if (origin.length < 5 || origin.length > 30) {
    newError.origin.lengthInvalid =
      "The origin must be between 5 and 30 characters.";
  }

  if (!/\.(jpeg|jpg|gif|png|bmp|svg)$/i.test(image)) {
    newError.image = "Please enter a valid url.";
  }

  if (height.maxHeight < height.minHeight) {
    newError.height.isMinor =
      "The minimum height cannot be more than the maxinum.";
  }
  if (height.maxHeight <= 0 || height.maxHeight <= 0) {
    newError.height.isEmpty = "Cannot be empty.";
  }

  if (+weight.maxWeight < +weight.minWeight) {
    newError.weight.isMinor =
      "The minimum weight cannot be more than the maxinum.";
  }
  if (weight.maxWeight <= 0 || weight.minWeight <= 0) {
    newError.weight.isEmpty = "Cannot be empty.";
  }

  if (+lifeSpan.maxLifeSpan < +lifeSpan.minLifeSpan)
    newError.lifeSpan.isMinor =
      "The minimum lifeSpan cannot be more than the maxinum.";
  if (lifeSpan.maxLifeSpan <= 0 || lifeSpan.minLifeSpan <= 0) {
    newError.lifeSpan.isEmpty = "Cannot be empty.";
  }

  setError(newError);
};

export default validateForm;
