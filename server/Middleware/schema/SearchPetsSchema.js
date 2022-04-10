const S = require("fluent-json-schema");

const searchPetsSchema = S.object()
  .prop("type", S.string())
  .prop("name", S.string())
  .prop("adoptionStatus", S.string())
  .prop("height", S.number())
  .prop("weight", S.number())
  .prop("minHeight", S.number())
  .prop("minWeight", S.number())
  .prop("color", S.string())
  .prop("hypoallergenic", S.string())
  .prop("dietery", S.string())
  .prop("breed", S.string())
  .valueOf();
module.exports = { searchPetsSchema };
