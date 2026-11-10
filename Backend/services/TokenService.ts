import { createRequire } from "node:module";
import type { UserEntity } from "../entities/UserEntity.js";

const require = createRequire(import.meta.url);
const jsonwebtoken = require("jsonwebtoken");

export class TokenService {
  generateToken(user: UserEntity): string {
    const jwtSecret = process.env.JWT_SECRET;
    if (jwtSecret === undefined) {
      throw new Error("JWT_SECRET is not set");
    }

    const signedToken = jsonwebtoken.sign({ sub: String(user.id) }, jwtSecret, {
      expiresIn: "1h",
    });
    return `Bearer ${signedToken}`;
  }
}
