import axios from "axios";
import {
  MovieDetails,
  MovieResponse,
  GenreResponse,
  SearchParams,
} from "../types/movie";

const api = axios.create({
  baseURL: import.meta.env.VITE_TMDB_API_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

export const getPopularMovies = async (page = 1): Promise<MovieResponse> => {
  const response = await api.get<MovieResponse>("/movie/popular", {
    params: { page },
  });
  return response.data;
};

export const getNowPlayingMovies = async (page = 1): Promise<MovieResponse> => {
  const response = await api.get<MovieResponse>("/movie/now_playing", {
    params: { page },
  });
  return response.data;
};

export const getTopRatedMovies = async (page = 1): Promise<MovieResponse> => {
  const response = await api.get<MovieResponse>("/movie/top_rated", {
    params: { page },
  });
  return response.data;
};

export const getUpcomingMovies = async (page = 1): Promise<MovieResponse> => {
  const response = await api.get<MovieResponse>("/movie/upcoming", {
    params: { page },
  });
  return response.data;
};

export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  const response = await api.get<MovieDetails>(`/movie/${id}`, {
    params: {
      append_to_response: "videos,credits,similar",
    },
  });
  return response.data;
};

export const searchMovies = async (
  params: SearchParams
): Promise<MovieResponse> => {
  const {
    query,
    page = 1,
    genreId,
    year,
    sortBy,
    minRating,
    category,
  } = params;

  const currentDate = new Date().toISOString().slice(0, 10);
  const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1))
    .toISOString()
    .slice(0, 10);
  const nextMonth = new Date(new Date().setMonth(new Date().getMonth() + 1))
    .toISOString()
    .slice(0, 10);

  // Define category filters
  const categoryFilters = {
    now_playing: {
      "primary_release_date.lte": currentDate,
      "primary_release_date.gte": lastMonth,
      with_release_type: "2|3",
    },
    upcoming: {
      "primary_release_date.gte": currentDate,
      "primary_release_date.lte": nextMonth,
    },
    top_rated: {
      "vote_count.gte": 300,
      sort_by: "vote_average.desc",
    },
    popular: {
      sort_by: "popularity.desc",
      "primary_release_date.lte": currentDate,
    },
  };

  if (query) {
    const response = await api.get<MovieResponse>("/search/movie", {
      params: {
        query,
        page,
        ...(category ? categoryFilters[category] : {}),
        ...(genreId ? { with_genres: genreId } : {}),
        ...(year ? { primary_release_year: year } : {}),
        ...(sortBy ? { sort_by: sortBy } : {}),
        ...(minRating ? { "vote_average.gte": minRating } : {}),
      },
    });
    return response.data;
  }

  const response = await api.get<MovieResponse>("/discover/movie", {
    params: {
      page,
      ...(category ? categoryFilters[category] : {}),
      ...(genreId ? { with_genres: genreId } : {}),
      ...(year ? { primary_release_year: year } : {}),
      ...(sortBy ? { sort_by: sortBy } : {}),
      ...(minRating ? { "vote_average.gte": minRating } : {}),
    },
  });
  return response.data;
};

export const getGenres = async (): Promise<GenreResponse> => {
  const response = await api.get<GenreResponse>("/genre/movie/list");
  return response.data;
};

export const getConfiguration = async () => {
  const response = await api.get("/configuration");
  return response.data;
};

export default api;
