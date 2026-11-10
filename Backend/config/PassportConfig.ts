import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import type { UsersService } from "../services/UsersService.js";

export function initJwtStrategy(usersService: UsersService): void {
  const jwtSecret = process.env.JWT_SECRET;
  if (jwtSecret === undefined) {
    throw new Error("JWT_SECRET is not set");
  }

  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtSecret,
      },
      async (payload, done) => {
        if (typeof payload.sub !== "string") {
          done(null, false);
          return;
        }

        const existingUser = await usersService.getById(Number(payload.sub));
        if (existingUser === null) {
          done(null, false);
          return;
        }

        done(null, existingUser);
      },
    ),
  );
}
