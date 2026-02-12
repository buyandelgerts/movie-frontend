export interface Movie {
  id: number;
  title: string;
  rating: number;
  year: string;
  genre: string[];
  duration: string;
  image: string;
  backdrop: string;
  type: "movie" | "series";
  status?: string;
}
