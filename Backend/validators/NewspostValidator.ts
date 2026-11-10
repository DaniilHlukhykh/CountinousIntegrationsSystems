import { createRequire } from "node:module";
import { Genre } from "../Genre.js";

const require = createRequire(import.meta.url);
const Validator = require("fastest-validator");


export const newspostSchema = {
  title: { type: "string", max: 50 },
  text: { type: "string", max: 256 },
  genre: { type: "enum", values: Object.values(Genre) },
  isPrivate: { type: "boolean" },
};

const validator = new Validator();

export const validateNewspost = validator.compile(newspostSchema);

export const newspostUpdateSchema = {
  title: { type: "string", max: 50, optional: true },
  text: { type: "string", max: 256, optional: true },
  genre: { type: "enum", values: Object.values(Genre), optional: true },
  isPrivate: { type: "boolean", optional: true },
};

export const validateNewspostUpdate = validator.compile(newspostUpdateSchema);
