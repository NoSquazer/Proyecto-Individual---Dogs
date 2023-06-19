import styles from "./ErrorInput.module.css";

const ErrorInput = ({ active, message }) => (
  <p className={active ? styles.p_error_active : styles.p_error_inactive}>
    {message}
  </p>
);

export default ErrorInput;
