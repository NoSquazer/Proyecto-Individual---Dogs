import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addDogs } from "../../redux/actions";

import styles from "./SearchBar.module.css";
import AlertMessage from "../AlertMessage/AlertMessage";
import validateName from "./validations";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState({
    status: "",
    message: "",
  });

  const handleOnChange = (event) => {
    setName(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      dispatch(addDogs(name));
      setName("");
    }
  };

  const handleOnClick = () => {
    dispatch(addDogs(name));
    setName("");
  };

  const clearError = () => {
    setAlert({
      ...alert,
      status: "",
      message: "",
    });
  };

  useEffect(() => {
    validateName(name, setError);
  }, [name]);

  return (
    <>
      <>
        {alert.status && (
          <AlertMessage
            status={alert.status}
            message={alert.message}
            clearError={clearError}
          />
        )}
      </>
      <div className={styles.container}>
        {error ? (
          <label className={styles.label}>Please, use only letters.</label>
        ) : null}
        <input
          className={styles.input}
          name="Search"
          value={name}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
        ></input>
        <button className={styles.button} onClick={handleOnClick}>
          Search
        </button>
      </div>
    </>
  );
};

export default SearchBar;
