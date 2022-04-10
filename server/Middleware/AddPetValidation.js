const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

function updateValidPet(schema) {
  const validate = ajv.compile(schema);
  return (req, res, next) => {
    const parsedWeight = parseInt(req.body.petData.weight);
    req.body.petData.weight = parsedWeight;
    const parsedHeight = parseInt(req.body.petData.height);
    req.body.petData.height = parsedHeight;
    const valid = validate(req.body);
    if (!valid) {
      res.status(400);
      res.send({ errors: validate.errors });
    } else {
      next();
    }
  };
}

module.exports = updateValidPet;
