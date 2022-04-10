const S = require("fluent-json-schema");

const addPetSchema = S.object()
  .prop("type", S.string())
  .prop("name", S.string())
  .prop("adoptionStatus", S.string())
  .prop("height", S.number())
  .prop("weight", S.number())
  .prop("color", S.string())
  .prop("hypoallergenic", S.string())
  .prop("dietery", S.string())
  .prop("breed", S.string())
  .prop("bio", S.string())
  .prop("picture", S.string())

  .valueOf();

module.exports = { addPetSchema };
