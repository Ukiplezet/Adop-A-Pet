require("dotenv").config();
const express = require("express");
const router = express.Router();
const {
  getAllPetsController,
  savePetToUser,
  getPetByTheUserId,
  deleteSavedPetFromArrayController,
  deletePetFromDB,
  returnSavedPetController,
  addNewPetToDBController,
  adoptOrFosterPetController,
  editPetDataController,
  getPetBySearchCriteria,
} = require("../controllers/PetsController");

const verifyToken = require("../Middleware/auth");
const updateValidPet = require("../Middleware/AddPetValidation");
const petSearchValid = require("../Middleware/SearchPetsValidation");

const { addPetSchema } = require("../Middleware/schema/AddPetSchema");
const { searchPetsSchema } = require("../Middleware/schema/SearchPetsSchema");


router.get("/", getAllPetsController);

router.get(
  "/:petData",
  petSearchValid(searchPetsSchema),
  getPetBySearchCriteria
);

router.post("/:id/save", verifyToken, savePetToUser);

router.get("/user/:id", verifyToken, getPetByTheUserId);

router.delete("/:id/save", verifyToken, deleteSavedPetFromArrayController);

router.put("/:id/delete", verifyToken, deletePetFromDB);

router.post("/:id/return", verifyToken, returnSavedPetController);

router.post(
  "/",
  verifyToken,
  updateValidPet(addPetSchema),
  addNewPetToDBController
);

router.post("/:id/adopt", verifyToken, adoptOrFosterPetController);

router.put(
  "/:id",
  verifyToken,
  updateValidPet(addPetSchema),
  editPetDataController
);

module.exports = router;
