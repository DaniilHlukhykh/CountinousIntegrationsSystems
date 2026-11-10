import type { Genre } from "../Genre.js";

export interface NewspostData {
  title: string;
  text: string;
  genre: Genre;
  isPrivate: boolean;
}
