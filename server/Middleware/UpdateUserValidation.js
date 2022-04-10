const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

function updateValid(schema) {
  const validate = ajv.compile(schema);
  return (req, res, next) => {
    if (req.body.phoneNumber) {
      const parsedNumber = parseInt(req.body.phoneNumber);
      req.body.phoneNumber = parsedNumber;
    }
    const valid = validate(req.body);
    if (!valid) {
      res.status(400);
      res.send({ errors: validate.errors });
    } else {
      next();
    }
  };
}

module.exports = updateValid;
