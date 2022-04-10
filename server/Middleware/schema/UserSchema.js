const S = require("fluent-json-schema");

const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
};
const loginSchema = S.object()
  .prop("email", S.string().required())
  .prop("password", S.string().required())
  .valueOf();

const signupSchema = S.object()
  .prop("email", S.string().required())
  .prop("firstName", S.string().required())
  .prop("lastName", S.string().required())
  .prop("password", S.string().minLength(6).required())
  .prop("phoneNumber", S.number().required())
  .valueOf();

const updateUserDataSchema = S.object()
  .prop("email", S.string())
  .prop("firstName", S.string())
  .prop("lastName", S.string())
  .prop("password", S.string())
  .prop("phoneNumber", S.number())
  .prop("bio", S.string())
  .valueOf();

module.exports = { loginSchema, signupSchema, updateUserDataSchema };
