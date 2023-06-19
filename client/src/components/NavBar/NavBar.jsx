import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./NavBar.module.css";
import AlertMessage from "../AlertMessage/AlertMessage";

const NavBar = () => {
  const { accessToken, userId } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState();
  const [alert, setAlert] = useState({
    status: "",
    message: "",
  });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    setAlert({
      ...alert,
      message: "Logout successfully!",
      status: 200,
    });

    dispatch(logout());
  };

  const handleOnClick = () => {
    if (!accessToken && !userId) {
      setAlert({
        ...alert,
        message: "You need to have an account to access!",
        status: 500,
      });
    }
  };

  const clearError = () => {
    setAlert({
      ...alert,
      status: "",
      message: "",
    });
  };

  useEffect(() => {
    if (userId) {
      return async () => {
        const { data } = await axios.get(
          `http://localhost:3001/dogs/users/${userId}`
        );

        setUsername(data.username);
      };
    }
  }, []);

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
      <div className={styles.div_container}>
        <div>
          <NavLink to="/home">
            <h5 className={styles.h5_navlinks}>Home</h5>
          </NavLink>
          <NavLink
            to={accessToken ? "/createDog" : null}
            onClick={handleOnClick}
          >
            <h5 className={styles.h5_navlinks}>Create</h5>
          </NavLink>
          <NavLink
            to={accessToken ? "/favorites" : null}
            onClick={handleOnClick}
          >
            <h5 className={styles.h5_navlinks}>Favorites</h5>
          </NavLink>
        </div>
        <div className={styles.user_menu}>
          {accessToken ? (
            <div className={styles.username_container} onClick={toggleMenu}>
              <h5 className={styles.username_size}>{username}</h5>
              {menuOpen && (
                <ul className={styles.menu_dropdown}>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              )}
            </div>
          ) : (
            <NavLink to="/login&register">
              <h5 className={styles.h5_navlinks}>Login/Register</h5>
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
