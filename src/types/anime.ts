export interface AnimeListItem {
  id: number;
  title: string;
  synopsis: string;
  posterImage: string;
  score: number | null;
  year: number | null;
  episodes: number | null;
}

export interface PaginationInfo {
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  totalItems: number | null;
}

export interface AnimeDetail extends AnimeListItem {
  bannerImage: string | null;
  rating: string | null;
  status: string | null;
  duration: string | null;
  genres: string[];
  studios: string[];
  themes: string[];
  trailerUrl: string | null;
  background: string | null;
}
