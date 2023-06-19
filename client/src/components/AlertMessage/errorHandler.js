const errorHandler = (status, setError) => {
  switch (status) {
    case 200:
      return setError(true);
    case 201:
      return setError(true);
    case 400:
      return setError(false);
    case 404:
      return setError(false);
    case 409:
      return setError(false);
    default:
      return setError(false);
  }
};

export default errorHandler;
