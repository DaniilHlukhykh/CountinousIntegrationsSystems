import "reflect-metadata";
import { join } from "node:path";
import { DataSource } from "typeorm";
import { UserEntity } from "../entities/UserEntity.js";
import { NewspostEntity } from "../entities/NewspostEntity.js";

// Міграції лежать поруч із config/: у dev це .ts (tsx), у dist це .js.
const migrationsGlob = join(import.meta.dirname, "..", "migrations", "*.{ts,js}");

const databaseUrl = process.env.DATABASE_URL;

function createDataSource(): DataSource {
  // Хмарна БД (Neon, Render Postgres, ...): одна рядкова змінна + SSL.
  if (databaseUrl !== undefined && databaseUrl !== "") {
    return new DataSource({
      type: "postgres",
      url: databaseUrl,
      ssl: { rejectUnauthorized: false },
      entities: [UserEntity, NewspostEntity],
      synchronize: false,
      migrations: [migrationsGlob],
    });
  }

  // Локальна розробка (як було раніше).
  const dbPassword = process.env.PGPASSWORD;
  if (dbPassword === undefined || dbPassword === "") {
    throw new Error("Set DATABASE_URL or PGPASSWORD");
  }

  return new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: dbPassword,
    database: "newsdb",
    entities: [UserEntity, NewspostEntity],
    synchronize: false,
    migrations: [migrationsGlob],
  });
}

export const dataSource = createDataSource();
