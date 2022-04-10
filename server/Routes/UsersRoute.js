require("dotenv").config();
const express = require("express");
const router = express.Router();
const {
  updateUserController,
  getUserByIdController,
} = require("../controllers/UsersController");

const updateValid = require("../Middleware/UpdateUserValidation");

const { updateUserDataSchema } = require("../Middleware/schema/UserSchema");

const verifyToken = require("../Middleware/auth");

router.put(
  "/:id",
  verifyToken,
  updateValid(updateUserDataSchema),
  updateUserController
);

router.get("/:id", verifyToken, getUserByIdController);

module.exports = router;
