import express from "express";
import { resolve } from "node:path";
import { NewspostsRepository } from "./repositories/NewspostsRepository.js";
import { NewspostsService } from "./services/NewspostsService.js";
import { ValidationError } from "./errors/ValidationError.js";
import type { NextFunction, Request, Response } from "express";
import { logger } from "./config/Logger.js";
import { UsersRepository } from "./repositories/UsersRepository.js";
import { UsersService } from "./services/UsersService.js";
import { TokenService } from "./services/TokenService.js";
import passport from "passport";
import { initJwtStrategy } from "./config/PassportConfig.js";
import { dataSource } from "./config/DataSource.js";
import type { UserEntity } from "./entities/UserEntity.js";

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use((request, response, next) => {
  let message = `${request.method} ${request.originalUrl}`;

  if (request.body !== undefined && Object.keys(request.body).length > 0) {
    message = `${message} ${JSON.stringify(request.body)}`;
  }

  logger.info(message);
  next();
});

app.use(express.static("../Client/dist"));

await dataSource.initialize();
const newspostsRepository = new NewspostsRepository();
const newspostsService = new NewspostsService(newspostsRepository);
const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
const tokenService = new TokenService();
initJwtStrategy(usersService);

app.get("/api/newsposts", async (request, response) => {
  const params = {
    page: Number(request.query.page) || 0,
    size: Number(request.query.size) || 10,
  };
  const newsposts = await newspostsService.getAll(params);
  response.json(newsposts);
});

app.get("/api/newsposts/error", () => {
  newspostsService.throwError();
});

app.get("/api/newsposts/:id", async (request, response) => {
  const newspost = await newspostsService.getById(Number(request.params.id));
  if (newspost === null) {
    response.status(404).json({ message: "Newspost not found" });
    return;
  }
  response.json(newspost);
});

app.post(
  "/api/newsposts",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    const authorizedUser = request.user as UserEntity;
    const newspost = await newspostsService.create(
      {
        title: request.body.title,
        text: request.body.text,
        genre: request.body.genre,
        isPrivate: request.body.isPrivate,
      },
      authorizedUser.id,
    );
    response.status(201).json(newspost);
  },
);

app.put("/api/newsposts/:id", async (request, response) => {
  const updatedNewspost = await newspostsService.update(
    Number(request.params.id),
    request.body,
  );
  if (updatedNewspost === null) {
    response.status(404).json({ message: "Newspost not found" });
    return;
  }
  response.json(updatedNewspost);
});

app.delete("/api/newsposts/:id", async (request, response) => {
  try {
    await newspostsService.delete(Number(request.params.id));
    response.sendStatus(200);
  } catch (error) {
    if (error instanceof Error && error.message === "Newspost not found") {
      response.sendStatus(404);
      return;
    }
    throw error;
  }
});

app.post("/auth/register", async (request, response) => {
  const registeredUser = await usersService.register({
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
  });
  const token = tokenService.generateToken(registeredUser);
  response.status(201).json({ token });
});

app.post("/auth/login", async (request, response) => {
  const loggedInUser = await usersService.login({
    email: request.body.email,
    password: request.body.password,
  });
  const token = tokenService.generateToken(loggedInUser);
  response.status(200).json({ token });
});

app.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    const authorizedUser = request.user as UserEntity;
    response.json({ id: authorizedUser.id, email: authorizedUser.email });
  },
);

app.get("/{*splat}", (request, response) => {
  response.sendFile(resolve("../Client/dist/index.html"));
});

app.use(
  (
    error: unknown,
    request: Request,
    response: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Express розпізнає error-handler за 4 аргументами
    next: NextFunction,
  ) => {
    if (error instanceof ValidationError) {
      logger.warn(`Validation failed: ${error.message}`);
      response.status(400).json({ message: error.message });
      return;
    }

    if (error instanceof Error) {
      logger.error(`${error.message} ${error.stack}`);
    } else {
      logger.error(String(error));
    }

    response.status(500).json({ message: "Internal server error" });
  },
);

const host = process.env.HOST || "localhost";
const port = Number(process.env.PORT || 8000);

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
