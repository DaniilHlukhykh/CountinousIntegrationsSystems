import { v4 } from "uuid";
import type { Newspost } from "./Newspost.js";
import type { NewspostData } from "./NewspostData.js";
import type { INewspostTable } from "./INewspostTable.js";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

export class NewspostTable implements INewspostTable {
  private newsposts: Newspost[] = [];

  constructor(private readonly filePath: string) {
    if (existsSync(this.filePath)) {
      const fileContent = readFileSync(this.filePath, "utf-8");
      this.newsposts = JSON.parse(fileContent) as Newspost[];
    }
  }

  private save(): void {
    writeFileSync(this.filePath, JSON.stringify(this.newsposts));
  }

  getAll(): Newspost[] {
    return this.newsposts;
  }

  getById(id: string): Newspost | undefined {
    return this.newsposts.find((newspost) => newspost.id === id);
  }

  create(data: NewspostData): Newspost {
    const newNewspost: Newspost = {
      id: v4(),
      createDate: new Date().toISOString(),
      title: data.title,
      text: data.text,
      genre: data.genre,
      isPrivate: data.isPrivate,
    };
    this.newsposts.push(newNewspost);
    this.save();
    return newNewspost;
  }

  update(id: string, data: Partial<NewspostData>): Newspost | undefined {
    const newspostIndex = this.newsposts.findIndex(
      (newspost) => newspost.id === id,
    );
    if (newspostIndex === -1) {
      return undefined;
    }

    const existingNewspost = this.newsposts.find(
      (newspost) => newspost.id === id,
    );
    if (existingNewspost === undefined) {
      return undefined;
    }
    const updatedNewspost: Newspost = {
      ...existingNewspost,
      ...data,
    };

    this.newsposts.splice(newspostIndex, 1, updatedNewspost);
    this.save();
    return updatedNewspost;
  }

  delete(id: string): string {
    const newspostIndex = this.newsposts.findIndex(
      (newspost) => newspost.id === id,
    );
    if (newspostIndex === -1) {
      throw new Error("Newspost not found");
    }
    this.newsposts.splice(newspostIndex, 1);
    this.save();
    return id;
  }
}
