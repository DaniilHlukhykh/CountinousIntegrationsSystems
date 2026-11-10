import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "../entities/UserEntity.js";
import { NewspostEntity } from "../entities/NewspostEntity.js";

const dbPassword = process.env.PGPASSWORD;
if (dbPassword === undefined || dbPassword === "") {
  throw new Error("PGPASSWORD is not set");
}

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: dbPassword,
  database: "newsdb",
  entities: [UserEntity, NewspostEntity],
  synchronize: false,
  migrations: ["migrations/*.ts"],
});
