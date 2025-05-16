import { useState, useEffect, useCallback } from "react";
import { Movie, MovieResponse, SearchParams } from "../../types/movie";
import { searchMovies } from "../../services/api";

interface UseMoviesReturn {
  movies: Movie[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  totalResults: number;
  loadMore: () => void;
  search: (params: SearchParams) => void;
}

export const useMovies = (initialParams?: SearchParams): UseMoviesReturn => {
  const [moviesMap, setMoviesMap] = useState<Map<number, Movie>>(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState<SearchParams>(
    initialParams || {}
  );

  const fetchMovies = useCallback(
    async (params: SearchParams, reset = false) => {
      try {
        setLoading(true);
        setError(null);

        const currentPage = reset ? 1 : page;

        const response: MovieResponse = await searchMovies({
          ...params,
          page: currentPage,
        });

        setTotalResults(response.total_results);
        setHasMore(currentPage < response.total_pages);

        if (reset) {
          // For reset, create new Map
          const newMap = new Map(
            response.results.map((movie) => [movie.id, movie])
          );
          setMoviesMap(newMap);
        } else {
          // For append, update existing Map
          setMoviesMap((prevMap) => {
            const newMap = new Map(prevMap);
            response.results.forEach((movie) => {
              newMap.set(movie.id, movie);
            });
            return newMap;
          });
        }

        setPage(currentPage + 1);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch movies")
        );
      } finally {
        setLoading(false);
      }
    },
    [page]
  );

  // Initial fetch
  useEffect(() => {
    fetchMovies(searchParams, true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchMovies(searchParams);
    }
  }, [fetchMovies, loading, hasMore, searchParams]);

  const search = useCallback(
    (params: SearchParams) => {
      setSearchParams(params);
      setPage(1);
      setMoviesMap(new Map());
      setTotalResults(0);
      fetchMovies(params, true);
    },
    [fetchMovies]
  );

  return {
    movies: Array.from(moviesMap.values()),
    loading,
    error,
    hasMore,
    totalResults,
    loadMore,
    search,
  };
};
