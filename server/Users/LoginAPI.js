const { log } = require("console");
const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "UsersList.json");

//
const loginUser = async (unAuthUser) => {
  const users = await getUserDatabase();
  return users.find((user) => {
    if (
      user.email === unAuthUser.email &&
      user.password === unAuthUser.password
    ) {
      return user;
    } else {
      return false;
    }
  });
};

const getUserDatabase = async () => {
  const authUsers = fs.readFileSync(filePath);
  return JSON.parse(authUsers);
};

exports.loginUser = loginUser;
