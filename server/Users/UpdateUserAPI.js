const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "UsersList.json");

async function getUserDatabase() {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, buffer) => {
      if (err) reject(err);
      else resolve(JSON.parse(buffer.toString()));
    });
  });
}

exports.getUserDatabase = getUserDatabase;

async function writeUsersDatabase(users) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(users), (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

exports.writeUsersDatabase = writeUsersDatabase;
