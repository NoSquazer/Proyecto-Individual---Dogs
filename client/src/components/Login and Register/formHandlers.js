export const handleOnChange = (event, userData, setUserData) => {
  setUserData({
    ...userData,
    [event.target.name]: event.target.value,
  });
};
export const handleOnFocus = (event, setFocus) => {
  setFocus({
    ...focus,
    [event.target.name]: true,
  });
};

export const handleOnBlur = (
  event,
  setFocus,
  validateOnBlur,
  error,
  hasErrors,
  setHasErrors
) => {
  setFocus({
    ...focus,
    [event.target.name]: false,
  });
};

export const handleDisabled = (error) => {
  const { username, email, password } = error;
  return (
    username.isInvalid ||
    username.lengthUsermane ||
    email.isInvalid ||
    email.lengthEmail ||
    password.isInvalid ||
    password.lengthPass
  );
};
export const handleChangeLogOrReg = (loginOrRegister, setLoginOrRegister) => {
  setLoginOrRegister(!loginOrRegister);
};

export const handleSubmit = async (
  event,
  userData,
  loginOrRegister,
  setAlert,
  loginRegister,
  navigate
) => {
  event.preventDefault();
  const data = await loginRegister(userData, loginOrRegister);
  if (data) {
    data.status &&
      data.message &&
      setAlert({
        ...alert,
        status: data.status,
        message: data.message,
      });
    setTimeout(() => {
      data.access && navigate("/home");
    }, 2500);
  }
};

export const clearError = (setAlert) => {
  setAlert({
    ...alert,
    status: "",
    message: "",
  });
};
