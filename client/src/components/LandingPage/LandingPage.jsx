import styles from "./LandingPage.module.css";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className={styles.div_container}>
      <div className={styles.div_content}>
        <h1 className={styles.h1_bigText}>Welcome to Dogs!</h1>
        <p className={styles.p_smallText}>There are Dogs.</p>
        <NavLink to="/home" className={styles.button_homeButton}>
          Home
        </NavLink>
      </div>
    </div>
  );
};

export default LandingPage;
