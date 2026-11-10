import type { Newspost } from "./Newspost.js";
import type { NewspostData } from "./NewspostData.js";

export interface INewspostTable {
  getAll(): Newspost[];
  getById(id: string): Newspost | undefined;
  create(data: NewspostData): Newspost;
  update(id: string, data: Partial<NewspostData>): Newspost | undefined;
  delete(id: string): string;
}
