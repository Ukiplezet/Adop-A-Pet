const verifyUserRole = (req, res, next) => {
  const role = req.body.role;
  if (role !== "admin") {
    return res.status(401).send("User Is Not Authorized Admin");
  } else {
    return next();
  }
};

module.exports = verifyUserRole;
