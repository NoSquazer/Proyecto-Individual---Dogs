import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeDogs,
  addFavoriteDogs,
  removeFavoriteDogs,
} from "../../redux/actions";

import styles from "./Card.module.css";
import AlertMessage from "../AlertMessage/AlertMessage";

const Card = ({ id, image, name, weight, temperament }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  const { userId, favoriteDogs, accessToken } = useSelector((state) => state);

  const [alert, setAlert] = useState(null);

  const handleClose = () => {
    dispatch(removeDogs(id));
  };

  const handleFavorite = () => {
    if (accessToken && userId) {
      setIsFavorite(!isFavorite);
      isFavorite
        ? dispatch(removeFavoriteDogs(userId, id))
        : dispatch(addFavoriteDogs(userId, id));
    } else {
      setAlert("Cannot add favorites without an account!");
    }
  };

  const clearError = () => {
    setAlert(null);
  };

  useEffect(() => {
    const isDogInFavorites = favoriteDogs.some((fav) => fav.id === id);
    setIsFavorite(isDogInFavorites);
  }, [favoriteDogs]);

  return (
    <div className={styles.card}>
      {alert && (
        <AlertMessage status={500} message={alert} clearError={clearError} />
      )}
      <div className={styles.imageContainer}>
        <NavLink to={`/detail/${id}`}>
          <img className={styles.img_dog} src={image} alt={name} />
          <h5 className={styles.h5_name}>{name}</h5>
        </NavLink>
      </div>
      <div className={styles.details}>
        <h5 className={styles.h5_weight_temperament}>Weight: {weight}</h5>
        <h5 className={styles.h5_weight_temperament}>
          Temperament:
          {typeof temperament === "string"
            ? temperament.split("").slice(0, 30).join("")
            : temperament[0].split("").slice(0, 30).join("")}
          ...
        </h5>
        <div className={styles.actions}>
          <button className={styles.button_close_and_fav} onClick={handleClose}>
            ✖
          </button>
          {isFavorite ? (
            <button
              className={styles.button_close_and_fav_active}
              onClick={handleFavorite}
            >
              🤍
            </button>
          ) : (
            <button
              className={styles.button_close_and_fav}
              onClick={handleFavorite}
            >
              🖤
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
