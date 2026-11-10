import type { User } from "./User.js";
import type { UserData } from "./UserData.js";

export interface IUserTable {
  create(data: UserData): User;
  getByEmail(email: string): User | undefined;
  getById(id: string): User | undefined;
}
