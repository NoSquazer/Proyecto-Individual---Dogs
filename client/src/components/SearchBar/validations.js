const validateName = (name, setError) => {
  if (!/^[a-zA-Z]+$/.test(name) && name.length >= 1) {
    return setError(true);
  }
  return setError(false);
};

export default validateName;
