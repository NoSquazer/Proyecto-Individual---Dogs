export const handleOnChange = (event, setDogData) => {
  const { name, value } = event.target;

  if (name.includes(".")) {
    const [objectName, subProperty] = name.split(".");
    setDogData((prevDogData) => ({
      ...prevDogData,
      [objectName]: {
        ...prevDogData[objectName],
        [subProperty]: value,
      },
    }));
  } else {
    setDogData((prevDogData) => ({
      ...prevDogData,
      [name]: value,
    }));
  }
};

export const handleOnFocus = (event, setFocus) => {
  const { name } = event.target;

  if (name.includes(".")) {
    const [objectName] = name.split(".");
    setFocus((prevFocus) => ({
      ...prevFocus,
      [objectName]: true,
    }));
  } else {
    setFocus((prevFocus) => ({
      ...prevFocus,
      [name]: true,
    }));
  }
};

export const handleOnBlur = (event, setFocus) => {
  const { name } = event.target;

  if (name.includes(".")) {
    const [objectName] = name.split(".");
    setFocus((prevFocus) => ({
      ...prevFocus,
      [objectName]: false,
    }));
  } else {
    setFocus((prevFocus) => ({
      ...prevFocus,
      [name]: false,
    }));
  }
};

export const handleDisabled = (error) => {
  const { name, height, weight, lifeSpan } = error;
  return (
    name.isInvalid ||
    name.lengthInvalid ||
    height.isMinor ||
    height.isEmpty ||
    weight.isMinor ||
    weight.isEmpty ||
    lifeSpan.isMinor ||
    lifeSpan.isEmpty
  );
};

export const handleAddTemperament = (event, setDogData, setTemperamentList) => {
  const { value } = event.target;

  setDogData((prevDogData) => ({
    ...prevDogData,
    temperamentList: [...prevDogData.temperamentList, value],
  }));

  setTemperamentList((prevtemperamentList) =>
    prevtemperamentList.filter((temperament) => {
      return temperament !== value;
    })
  );
};

export const handleRemoveTemperament = (
  event,
  setDogData,
  setTemperamentList
) => {
  const { value } = event.target;

  setTemperamentList((prevtemperamentList) => {
    return [...prevtemperamentList, value];
  });
  setDogData((prevDogData) => ({
    ...prevDogData,
    temperamentList: prevDogData.temperamentList.filter((temperament) => {
      return temperament !== value;
    }),
  }));
};

export const clearError = (setAlert) => {
  setAlert({
    ...alert,
    status: "",
    message: "",
  });
};
