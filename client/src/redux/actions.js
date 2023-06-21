import axios from "axios";
import {
  ADD_DOGS,
  REMOVE_DOGS,
  ADD_FAVORITE_DOGS,
  REMOVE_FAVORITE_DOGS,
  ADD_MULTIPLE_FAV_DOGS,
  ADD_TEMPERAMENTS,
  LOGIN,
  REGISTER,
  LOGOUT,
  FILTER,
  ORDER,
} from "./actions-types";

export const addDogs = (name) => {
  try {
    return async (dispatch) => {
      if (!name) {
        const { data } = await axios.get("http://localhost:3001/dogs/all");

        return dispatch({ type: ADD_DOGS, payload: data });
      } else {
        const { data } = await axios.get(
          `http://localhost:3001/dogs/name?name=${name}`
        );

        return dispatch({ type: ADD_DOGS, payload: data });
      }
    };
  } catch ({ message }) {
    return message;
  }
};

export const removeDogs = (id) => {
  return { type: REMOVE_DOGS, payload: id };
};

export const addFavoriteDogs = (userId, dogId) => {
  try {
    return async (dispatch) => {
      await axios.post("http://localhost:3001/dogs/favorites", {
        userId: userId,
        dogId: dogId,
      });
      const { data } = await axios.get(`http://localhost:3001/dogs/${dogId}`);

      return dispatch({ type: ADD_FAVORITE_DOGS, payload: data });
    };
  } catch (error) {
    return console.log(error);
  }
};

export const removeFavoriteDogs = (userId, dogId) => {
  try {
    return async (dispatch) => {
      await axios.delete(
        `http://localhost:3001/dogs/favorites/delete?userId=${userId}&dogId=${dogId}`
      );

      return dispatch({ type: REMOVE_FAVORITE_DOGS, payload: dogId });
    };
  } catch (error) {
    return console.log(error);
  }
};

export const updateMultipleFavDogs = (dogsId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/dogs/all");

      const filteredFavDogs = data.filter((dog) => {
        return dogsId.some((favDog) => {
          return favDog === dog.id;
        });
      });

      return dispatch({
        type: ADD_MULTIPLE_FAV_DOGS,
        payload: filteredFavDogs,
      });
    } catch ({ message }) {
      return message;
    }
  };
};

export const addTemperaments = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        "http://localhost:3001/dogs/temperaments"
      );

      const temperamentsList = data.map((temperament) => {
        return temperament.name;
      });

      return dispatch({ type: ADD_TEMPERAMENTS, payload: temperamentsList });
    } catch ({ message }) {
      return message;
    }
  };
};

export const login = (accessToken, userId) => {
  return { type: LOGIN, payload: { accessToken, userId } };
};

export const register = (accessToken, userId) => {
  return { type: REGISTER, payload: { accessToken, userId } };
};

export const logout = () => {
  return { type: LOGOUT, payload: { accessToken: null, userId: null } };
};

export function filterCards(order, temperament, isInFavs) {
  if (order === "TEMPERAMENTS") {
    return { type: FILTER, payload: { order, temperament, isInFavs } };
  }
  if (order === "CREATED") {
    return async (dispatch) => {
      try {
        const { data } = await axios.get("http://localhost:3001/dogs");
        return dispatch({ type: FILTER, payload: { order, data, isInFavs } });
      } catch ({ message }) {
        return message;
      }
    };
  }
}

export function orderCards(order, isInFavs) {
  return { type: ORDER, payload: { order, isInFavs } };
}
