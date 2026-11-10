export interface Newspost {
  id: number;
  title: string;
  text: string;
  author: { id: number; email: string } | null;
}