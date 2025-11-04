import type { AnimeDetail, AnimeListItem, PaginationInfo } from "../types/anime";

const API_BASE_URL = "https://api.jikan.moe/v4";
const SEARCH_PAGE_SIZE = 12;

interface JikanImageFormats {
  image_url?: string | null;
  small_image_url?: string | null;
  large_image_url?: string | null;
}

interface JikanImageSet {
  jpg?: JikanImageFormats;
  webp?: JikanImageFormats;
}

interface JikanGenreLike {
  name: string;
}

interface JikanSearchItem {
  mal_id: number;
  title?: string | null;
  synopsis?: string | null;
  score?: number | null;
  year?: number | null;
  episodes?: number | null;
  images?: JikanImageSet;
}

interface JikanPagination {
  current_page: number;
  last_visible_page: number;
  has_next_page: boolean;
  items?: {
    total?: number | null;
  };
}

interface JikanSearchResponse {
  data: JikanSearchItem[];
  pagination: JikanPagination;
}

interface JikanDetailResponse {
  data: JikanSearchItem & {
    trailer?: {
      embed_url?: string | null;
      images?: {
        maximum_image_url?: string | null;
      } | null;
    } | null;
    background?: string | null;
    rating?: string | null;
    status?: string | null;
    duration?: string | null;
    genres?: JikanGenreLike[];
    studios?: JikanGenreLike[];
    themes?: JikanGenreLike[];
  };
}

interface SearchResponse {
  items: AnimeListItem[];
  pagination: PaginationInfo;
}

const extractImageUrl = (images?: JikanImageSet): string => {
  return (
    images?.webp?.large_image_url ??
    images?.webp?.image_url ??
    images?.jpg?.large_image_url ??
    images?.jpg?.image_url ??
    ""
  );
};

export const searchAnime = async (
  query: string,
  page: number,
  signal: AbortSignal
): Promise<SearchResponse> => {
  const url = new URL(`${API_BASE_URL}/anime`);
  url.searchParams.set("q", query);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(SEARCH_PAGE_SIZE));
  url.searchParams.set("sfw", "true");
  url.searchParams.set("order_by", "score");
  url.searchParams.set("sort", "desc");

  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error("Failed to fetch anime search results");
  }

  const data: JikanSearchResponse = await response.json();

  const items: AnimeListItem[] = data.data.map((item) => ({
    id: item.mal_id,
    title: item.title ?? "Untitled",
    synopsis: item.synopsis ?? "No synopsis available.",
    posterImage: extractImageUrl(item.images),
    score: item.score ?? null,
    year: item.year ?? null,
    episodes: item.episodes ?? null
  }));

  const pagination: PaginationInfo = {
    currentPage: data.pagination?.current_page ?? page,
    lastPage: data.pagination?.last_visible_page ?? page,
    hasNextPage: Boolean(data.pagination?.has_next_page),
    totalItems: data.pagination?.items?.total ?? null
  };

  return { items, pagination };
};

export const getAnimeDetail = async (
  id: number,
  signal: AbortSignal
): Promise<AnimeDetail> => {
  const response = await fetch(`${API_BASE_URL}/anime/${id}/full`, { signal });
  if (!response.ok) {
    throw new Error("Failed to fetch anime detail");
  }

  const data: JikanDetailResponse = await response.json();
  const anime = data.data;

  const posterImage = extractImageUrl(anime.images);
  const trailerBanner = anime.trailer?.images?.maximum_image_url ?? null;
  const bannerImage = trailerBanner ?? (posterImage ? posterImage : null);

  return {
    id: anime.mal_id,
    title: anime.title ?? "Untitled",
    synopsis: anime.synopsis ?? "No synopsis available.",
    posterImage,
    bannerImage,
    score: anime.score ?? null,
    year: anime.year ?? null,
    episodes: anime.episodes ?? null,
    rating: anime.rating ?? null,
    status: anime.status ?? null,
    duration: anime.duration ?? null,
    genres: Array.isArray(anime.genres) ? anime.genres.map((genre) => genre.name) : [],
    studios: Array.isArray(anime.studios) ? anime.studios.map((studio) => studio.name) : [],
    themes: Array.isArray(anime.themes) ? anime.themes.map((theme) => theme.name) : [],
    trailerUrl: anime.trailer?.embed_url ?? null,
    background: anime.background ?? null
  };
};
