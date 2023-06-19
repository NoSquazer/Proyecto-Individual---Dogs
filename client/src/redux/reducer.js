import {
  ADD_DOGS,
  REMOVE_DOGS,
  ADD_FAVORITE_DOGS,
  REMOVE_FAVORITE_DOGS,
  ADD_MULTIPLE_FAV_DOGS,
  FILTER,
  ORDER,
  LOGIN,
  REGISTER,
  LOGOUT,
  ADD_TEMPERAMENTS,
} from "./actions-types";

const initialState = {
  dogs: [],
  favoriteDogs: [],
  temperaments: [],
  userId: null,
  accessToken: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_DOGS:
      return {
        ...state,
        dogs: payload,
      };

    case REMOVE_DOGS:
      return {
        ...state,
        dogs: state.dogs.filter((dog) => dog.id !== payload),
      };

    case ADD_FAVORITE_DOGS:
      return {
        ...state,
        favoriteDogs: [...state.favoriteDogs, payload],
      };

    case REMOVE_FAVORITE_DOGS:
      return {
        ...state,
        favoriteDogs: state.favoriteDogs.filter((dog) => dog.id !== payload),
      };

    case ADD_MULTIPLE_FAV_DOGS:
      return {
        ...state,
        favoriteDogs: state.favoriteDogs.length ? state.favoriteDogs : payload,
      };

    case ADD_TEMPERAMENTS:
      return {
        ...state,
        temperaments: payload,
      };

    case LOGIN:
      return {
        ...state,
        userId: payload.userId,
        accessToken: payload.accessToken,
      };

    case REGISTER:
      return {
        ...state,
        userId: payload.userId,
        accessToken: payload.accessToken,
      };

    case LOGOUT:
      return {
        ...state,
        userId: payload.userId,
        accessToken: payload.accessToken,
      };

    case FILTER: {
      const { order, temperament, isInFavs } = payload;
      if (order === "TEMPERAMENTS") {
        const filteredDogs = state.dogs.filter((dog) => {
          if (dog.temperament) {
            if (typeof dog.temperament === "string") {
              return dog.temperament === temperament;
            } else {
              return dog.temperament.includes(temperament);
            }
          }
        });

        const filteredFavoriteDogs = state.favoriteDogs.filter((dog) => {
          if (dog.temperament) {
            if (typeof dog.temperament === "string") {
              return dog.temperament === temperament;
            } else {
              return dog.temperament.includes(temperament);
            }
          }
        });

        return {
          ...state,
          dogs: !isInFavs ? filteredDogs : state.dogs,
          favoriteDogs: isInFavs ? filteredFavoriteDogs : state.favoriteDogs,
        };
      }
      if (order === "CREATED") {
        const filteredDogs = state.dogs.filter((dog) => {
          return !payload.data.some((data) => data.name === dog.name);
        });

        const filteredFavoriteDogs = state.favoriteDogs.filter((dog) => {
          return !payload.data.some((data) => data.name === dog.name);
        });

        return {
          ...state,
          dogs: !isInFavs ? filteredDogs : state.dogs,
          favoriteDogs: isInFavs ? filteredFavoriteDogs : state.favoriteDogs,
        };
      }
    }

    case ORDER: {
      const { order, isInFavs } = payload;

      if (order === "A") {
        return {
          ...state,
          dogs: !isInFavs
            ? state.dogs.sort((dogA, dogB) => dogA.id - dogB.id)
            : state.dogs,
          favoriteDogs: isInFavs
            ? state.favoriteDogs.sort((dogA, dogB) => dogA.id - dogB.id)
            : state.favoriteDogs,
        };
      }
      if (order === "D") {
        return {
          ...state,
          dogs: !isInFavs
            ? state.dogs.sort((dogA, dogB) => dogB.id - dogA.id)
            : state.dogs,
          favoriteDogs: isInFavs
            ? state.favoriteDogs.sort((dogA, dogB) => dogB.id - dogA.id)
            : state.favoriteDogs,
        };
      }
      if (order === "A-Z") {
        const sortedDogs = state.dogs.sort((dogA, dogB) => {
          const nameA = dogA.name.toLowerCase();
          const nameB = dogB.name.toLowerCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });

        const sortedFavDogs = state.favoriteDogs.sort((dogA, dogB) => {
          const nameA = dogA.name.toLowerCase();
          const nameB = dogB.name.toLowerCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        return {
          ...state,
          dogs: !isInFavs ? sortedDogs : state.dogs,
          favoriteDogs: isInFavs ? sortedFavDogs : state.favoriteDogs,
        };
      }
      if (order === "WEIGHT") {
        const sortedDogs = state.dogs.sort((dogA, dogB) => {
          const weightA = parseInt(dogA.weight.split(" ")[0]);
          const weightB = parseInt(dogB.weight.split(" ")[0]);

          return weightA - weightB;
        });
        const sortedFavDogs = state.favoriteDogs.sort((dogA, dogB) => {
          const weightA = parseInt(dogA.weight.split(" ")[0]);
          const weightB = parseInt(dogB.weight.split(" ")[0]);

          return weightA - weightB;
        });

        return {
          ...state,
          dogs: !isInFavs ? sortedDogs : state.dogs,
          favoriteDogs: isInFavs ? sortedFavDogs : state.favoriteDogs,
        };
      }
    }

    default:
      return { ...state };
  }
};

export default reducer;
