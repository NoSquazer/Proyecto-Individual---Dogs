import { useState, useEffect } from "react";

import styles from "./AlertMessage.module.css";
import errorHandler from "./errorHandler";

const AlertMessage = ({ status, message, clearError }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    errorHandler(status, setError);

    if (status) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        clearError();
      }, 5000);
    }
  }, [status]);

  if (!isVisible) {
    return null;
  }

  return isVisible ? (
    <div
      className={`${styles.error_container} ${
        error ? styles.success : styles.error
      } ${styles.show}`}
    >
      {error ? (
        <h5 className={styles.icon_good}>✔</h5>
      ) : (
        <h5 className={styles.icon_notgood}>✖</h5>
      )}
      <h5 className={styles.message}>{message}</h5>
    </div>
  ) : null;
};

export default AlertMessage;
