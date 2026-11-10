import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const Validator = require("fastest-validator");

const validator = new Validator();

export const userRegisterSchema = {
  email: { type: "email" },
  password: { type: "string" },
  confirmPassword: { type: "string" },
};

export const validateUserRegister = validator.compile(userRegisterSchema);
