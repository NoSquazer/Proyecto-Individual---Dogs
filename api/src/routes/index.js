const { Router } = require("express");

const login = require("../controllers/post/login");

const postDogs = require("../controllers/post/postDogs");
const postFavorites = require("../controllers/post/postFavorites");
const postUsers = require("../controllers/post/postUsers");

const getAllDogs = require("../controllers/get/getAllDogs");
const getDogs = require("../controllers/get/getDogs");
const getDogsById = require("../controllers/get/getDogsById");
const getDogsName = require("../controllers/get/getDogsByName");
const getFavorites = require("../controllers/get/getFavorites.js");
const getFavoritesByName = require("../controllers/get/getFavoritesByName");
const getFavoritesByUserId = require("../controllers/get/getFavoritesByUserId");
const getTemperaments = require("../controllers/get/getTemperaments");
const getUsers = require("../controllers/get/getUsers");
const getUsersByName = require("../controllers/get/getUsersByName");
const getUsersById = require("../controllers/get/getUsersById");

const putDogs = require("../controllers/put/putDogs");
const putUsers = require("../controllers/put/putUsers");

const deleteDogs = require("../controllers/delete/deleteDogs");
const deleteFavorites = require("../controllers/delete/deleteFavorites");
const deleteUsers = require("../controllers/delete/deleteUsers");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.post("/users/login", login);
router.post("/", postDogs);
router.post("/favorites", postFavorites);
router.post("/users/register", postUsers);

router.get("/favorites/name", getFavoritesByName);
router.get("/favorites", getFavorites);
router.get("/", getDogs);
router.get("/all", getAllDogs);
router.get("/name", getDogsName);
router.get("/users/name", getUsersByName);
router.get("/users", getUsers);
router.get("/temperaments", getTemperaments);
router.get("/users/:id", getUsersById);
router.get("/favorites/:id", getFavoritesByUserId);
router.get("/:id", getDogsById);

router.put("/", putDogs);
router.put("/users", putUsers);

router.delete("/:id", deleteDogs);
router.delete("/favorites/delete", deleteFavorites);
router.delete("/users/:id", deleteUsers);

module.exports = router;
