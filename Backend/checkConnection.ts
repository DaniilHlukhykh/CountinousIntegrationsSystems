import { dataSource } from "./config/DataSource.js";

await dataSource.initialize();
console.log("Connected");
await dataSource.destroy();