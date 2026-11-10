import { FileDB } from "./FileDB.js";
import { NewspostTable } from "./NewspostTable.js";
import type { NewspostData } from "./NewspostData.js";
import { Genre } from "./Genre.js";
import type { INewspostTable } from "./INewspostTable.js";
import { UserTable } from "./UserTable.js";
import type { IUserTable } from "./IUserTable.js";
import type { UserData } from "./UserData.js";

const fileDB = new FileDB();

fileDB.registerSchema("newsposts", NewspostTable);
fileDB.registerSchema("users", UserTable);
const userTable = fileDB.getTable<IUserTable>("users");
const newspostTable = fileDB.getTable<INewspostTable>("newsposts");

const newspostData: NewspostData = {
  title: "У зоопарку Чернігова лисичка народила лисеня",
  text: "В Чернігівському заопарку сталася чудова подія! Лисичка на ім'я Руда народила чудове лисенятко! Тож поспішайте навідатись та подивитись на це миле створіння!",
  genre: Genre.Sport,
  isPrivate: false,
};

const userData: UserData = {
  email: "test@test.com",
  password: "qwe123",
};

const createdUser = userTable.create(userData);
console.log(createdUser);
console.log(userTable.getByEmail(userData.email));

const createdNewspost = newspostTable.create(newspostData);
console.log(createdNewspost);
console.log(newspostTable.getAll());

const updatedNewspost = newspostTable.update(createdNewspost.id, {
  title: "Маленька лисичка",
});
console.log(updatedNewspost);

const deletedId = newspostTable.delete(createdNewspost.id);
console.log(deletedId);
