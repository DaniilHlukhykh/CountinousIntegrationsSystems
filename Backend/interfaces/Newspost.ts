import type { Genre } from "../Genre.js";

export interface Newspost {
  id: string;
  createDate: string;
  title: string;
  text: string;
  genre: Genre;
  isPrivate: boolean;
}
