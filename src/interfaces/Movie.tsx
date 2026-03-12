import type { Credit } from "./Credit";
import type { SimilarMovie } from "./SimilarMovie";
export interface Movie {
  tmdb_id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  teaser_path: string;
  type: string;
  genres: string;
  writer: string;
  director: string;
  credits: Credit[];
  similar_movies: SimilarMovie[];
}
