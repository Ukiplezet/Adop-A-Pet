require("dotenv").config();
const express = require("express");
const router = express.Router();
const {
  loginController,
  signupController,
} = require("../controllers/UsersController");

const updateValid = require("../Middleware/UpdateUserValidation");

const loginValid = require("../Middleware/LoginValidation");
const {
  loginSchema,
  signupSchema,
} = require("../Middleware/schema/UserSchema");

router.post("/login", loginValid(loginSchema), loginController);

router.post("/signup", updateValid(signupSchema), signupController);
module.exports = router;
