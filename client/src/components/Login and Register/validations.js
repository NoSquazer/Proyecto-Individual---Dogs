export const validateForms = ({ username, email, password }, setError) => {
  const newError = {
    username: { isInvalid: false, lengthUsermane: false },
    email: { isInvalid: false, lengthEmail: false },
    password: { isInvalid: false, lengthPass: false },
  };

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    newError.username.isInvalid = "Please enter a valid Username.";
  }
  if (username.length < 5 || username.length > 20) {
    newError.username.lengthUsermane =
      "The username must be between 5 and 15 characters.";
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    newError.email.isInvalid = "Please enter a valid Email.";
  }
  if (email.length > 35) {
    newError.email.lengthEmail =
      "The email cannot be longer than 35 characters.";
  }
  if (!/^(?=.*\d)(?=.*[A-Z]).+$/.test(password)) {
    newError.password.isInvalid =
      "The password must have one number and one uppercase.";
  }
  if (password.length < 5 || password.length > 20) {
    newError.password.lengthPass =
      "The password must be between 5 and 20 characters.";
  }

  setError(newError);
};

// export const validateOnBlur = (
//   { username, email, password },
//   hasErrors,
//   setHasErrors
// ) => {
//   const newError = {
//     username: false,
//     email: false,
//     password: false,
//   };

//   if (username.isInvalid || username.lengthUsermane) {
//     newError.username = true;
//   }
//   if (email.isInvalid || email.lengthEmail) {
//     newError.email = true;
//   }
//   if (password.isInvalid || password.lengthPass) {
//     newError.password = true;
//   }

//   setHasErrors(newError);
// };
