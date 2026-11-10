import type { Genre } from "../Genre.js";
import type { AuthorResponse } from "./AuthorResponse.js";

export interface NewspostResponse {
  id: number;
  title: string;
  text: string;
  genre: Genre;
  isPrivate: boolean;
  author: AuthorResponse | null;
}
