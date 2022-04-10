require("dotenv").config();

const {
  loginUser,
  addNewUser,
  updateUserDetails,
  getUserFromDBById,
} = require("../data/Users");

async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    const response = await loginUser(email, password);
    res.status(200).send(response);
  } catch (e) {
    res.send(e);
  }
}

async function signupController(req, res) {
  try {
    const { email, firstName, lastName, password, phoneNumber } = req.body;
    if (
      !(email && password && firstName && lastName && password && phoneNumber)
    ) {
      res.status(400).send("All input is required");
    }

    const response = await addNewUser(
      email,
      firstName,
      lastName,
      password,
      phoneNumber
    );

    if (response === "oldUser") {
      return res.status(409).send("User already exists. Please Login ");
    }

    res.status(201).json(response);
  } catch (err) {
    return err.message;
  }
}
async function updateUserController(req, res) {
  const userData = { ...req.body };
  try {
    const userId = req.params.id;
    await updateUserDetails(userId, userData);
    const response = await getUserFromDBById(userId);
    return res.status(201).send(response);
  } catch (err) {
    res.status(500).send(err);
  }
}
async function getUserByIdController(req, res) {
  const userId = req.user.user_id;
  try {
    const response = await getUserFromDBById(userId);
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err);
  }
}
module.exports = {
  loginController,
  signupController,
  updateUserController,
  getUserByIdController,
};
