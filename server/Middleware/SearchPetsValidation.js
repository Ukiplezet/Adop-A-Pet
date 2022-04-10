const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

function petSearchValid(schema) {
  const validate = ajv.compile(schema);
  return (req, res, next) => {
    if (req.query.height) {
      const parsedHeight = parseInt(req.query.height);
      req.query.height = parsedHeight;
    }
    if (req.query.minheight) {
      const parsedMinHeight = parseInt(req.query.minheight);
      req.query.minheight = parsedMinHeight;
    }
    if (req.query.weight) {
      const parsedWeight = parseInt(req.query.weight);
      req.query.weight = parsedWeight;
    }
    if (req.query.minweight) {
      const parsedMinWeight = parseInt(req.query.minweight);
      req.query.minweight = parsedMinWeight;
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

module.exports = petSearchValid;
