import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  handleOnChange,
  handleOnBlur,
  handleOnFocus,
  handleDisabled,
  handleChangeLogOrReg,
  handleSubmit,
  clearError,
} from "./formHandlers";

import styles from "./LoginAndRegister.module.css";
import { validateForms } from "./validations.js";
import loginRegister from "./loginRegister";
import AlertMessage from "../AlertMessage/AlertMessage";
import InputField from "../InputField/InputField";

const LoginAndRegister = () => {
  const navigate = useNavigate();

  const [loginOrRegister, setLoginOrRegister] = useState(true);

  const [alert, setAlert] = useState({
    status: "",
    message: "",
  });

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    username: { isInvalid: false, lengthUsermane: false },
    email: { isInvalid: false, lengthEmail: false },
    password: { isInvalid: false, lengthPass: false },
    notFound: false,
  });

  const [hasErrors, setHasErrors] = useState({
    isFocused: true,
    username: error.username.isInvalid || error.username.lengthUsermane,
    email: error.email.isInvalid || error.email.lengthEmail,
    password: error.password.isInvalid || error.password.lengthPass,
  });

  const [focus, setFocus] = useState({
    username: false,
    email: false,
    password: false,
  });

  useEffect(() => {
    validateForms(userData, setError);
  }, [userData]);

  return (
    <>
      <>
        {alert.status && (
          <AlertMessage
            status={alert.status}
            message={alert.message}
            clearError={() => clearError(setAlert)}
          />
        )}
      </>
      <div className={styles.container}>
        <form
          onSubmit={(event) =>
            handleSubmit(
              event,
              userData,
              loginOrRegister,
              setAlert,
              loginRegister,
              navigate
            )
          }
          className={styles.formContainer}
        >
          <h3 className={styles.h3LoginOrRegister}>
            {loginOrRegister ? "LOGIN" : "REGISTER"}
          </h3>

          <InputField
            type="text"
            name="username"
            placeholder="Enter username"
            value={userData.username}
            error={error.username}
            focus={focus.username}
            onChange={(event) => handleOnChange(event, userData, setUserData)}
            onFocus={(event) => handleOnFocus(event, setFocus)}
            onBlur={(event) => handleOnBlur(event, setFocus)}
            className={
              hasErrors.isFocused
                ? styles.inputDefault
                : hasErrors.username
                ? styles.inputActiveErrors
                : styles.inputInactiveErrors
            }
          />
          <InputField
            type="text"
            name="email"
            placeholder="Enter email"
            value={userData.email}
            error={error.email}
            focus={focus.email}
            onChange={(event) => handleOnChange(event, userData, setUserData)}
            onFocus={(event) => handleOnFocus(event, setFocus)}
            onBlur={(event) => handleOnBlur(event, setFocus)}
            className={
              hasErrors.isFocused
                ? styles.inputDefault
                : hasErrors.email
                ? styles.inputActiveErrors
                : styles.inputInactiveErrors
            }
          />
          <InputField
            type="password"
            name="password"
            placeholder="Enter password"
            value={userData.password}
            error={error.password}
            focus={focus.password}
            onChange={(event) => handleOnChange(event, userData, setUserData)}
            onFocus={(event) => handleOnFocus(event, setFocus)}
            onBlur={(event) => handleOnBlur(event, setFocus)}
            className={
              hasErrors.isFocused
                ? styles.inputDefault
                : hasErrors.password
                ? styles.inputActiveErrors
                : styles.inputInactiveErrors
            }
          />

          {loginOrRegister ? (
            <button
              disabled={() => handleDisabled(error)}
              className={styles.loginButton}
            >
              Login
            </button>
          ) : (
            <button
              disabled={() => handleDisabled(error)}
              className={styles.registerButton}
            >
              Register
            </button>
          )}
        </form>
        <div className={styles.divTextButton}>
          <p>
            {loginOrRegister
              ? "You don't have an account yet?"
              : "Already have an account?"}
          </p>
          <button
            onClick={() =>
              handleChangeLogOrReg(loginOrRegister, setLoginOrRegister)
            }
            className={styles.textButton}
          >
            {loginOrRegister ? "Register now!" : "Login now!"}
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginAndRegister;
