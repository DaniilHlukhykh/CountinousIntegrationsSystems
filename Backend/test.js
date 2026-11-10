import { FileDB } from "./FileDB.js";
import { NewspostTable } from "./NewspostTable.js";

const fileDB = new FileDB();
fileDB.getTable("newsposts", NewspostTable);

const newspostSchema = {
  id: Number,
  title: String,
  text: String,
  createDate: Date,
};

fileDB.registerSchema("newspost", newspostSchema);

const newspostTable = fileDB.getTable("newspost");

console.log(newspostTable.create({ title: "Колобок", text: "lorem45" }));
console.log(newspostTable.getAll());
console.log(newspostTable.update(2, { title: "Репка" }));
console.log(newspostTable.delete(2));
console.log(newspostTable.getAll());


