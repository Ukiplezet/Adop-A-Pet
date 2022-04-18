require("dotenv").config();
const express = require("express");
const router = express.Router();
const {
  updateUserController,
  getUserByIdController,
  getAllUsersFromDB,
} = require("../controllers/UsersController");

const updateValid = require("../Middleware/UpdateUserValidation");
const verifyToken = require("../Middleware/auth");
const verifyUserRole = require("../Middleware/UserRoleValidation");
const { updateUserDataSchema } = require("../Middleware/schema/UserSchema");

router.put(
  "/:id",
  verifyToken,
  updateValid(updateUserDataSchema),
  updateUserController
);

router.get("/:id", verifyToken, getUserByIdController);

router.post("/", verifyUserRole, getAllUsersFromDB);

module.exports = router;
