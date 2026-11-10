import { existsSync, readFileSync, writeFileSync } from "node:fs";
import type { IUserTable } from "./IUserTable.js";
import type { User } from "./User.js";
import type { UserData } from "./UserData.js";
import { v4 } from "uuid";

export class UserTable implements IUserTable {
  private users: User[];
  private readonly filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
    if (existsSync(this.filePath)) {
      this.users = JSON.parse(readFileSync(this.filePath, "utf-8")) as User[];
    } else {
      this.users = [];
    }
  }

  getByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  private save(): void {
    writeFileSync(this.filePath, JSON.stringify(this.users));
  }

  create(data: UserData): User {
    const newUser: User = {
      id: v4(),
      email: data.email,
      password: data.password,
    };
    this.users.push(newUser);
    this.save();
    return newUser;
  }

  getById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}
