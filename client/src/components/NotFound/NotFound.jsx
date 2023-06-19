import { useNavigate } from "react-router-dom";

import styles from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h3>404</h3>
      </div>
      <div className={styles.right}>
        <h2>Sorry!</h2>
        <h3>Page not found</h3>
        <button
          className={styles.button}
          onClick={() => {
            navigate("/home");
          }}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
