import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchParams } from "../types/movie";
import SearchBar from "../components/molecules/SearchBar";
// import FilterBar from "../components/molecules/FilterBar";
import MovieGrid from "../components/organisms/MovieGrid";
import MovieList from "../components/organisms/MovieList";
import { useMovies } from "../hooks/queries/useMovies";
import { useGenres } from "../hooks/queries/useGenres";
import { formatNumber } from "../utils/formatter";
import { ArrowUp } from "lucide-react";
import FilterBar from "../components/molecules/FilterBar";

const MovieListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const filters: SearchParams = useMemo(
    () => ({
      query: searchParams.get("query") || "",
      genreId: searchParams.get("genre")
        ? Number(searchParams.get("genre"))
        : undefined,
      year: searchParams.get("year")
        ? Number(searchParams.get("year"))
        : undefined,
      sortBy: searchParams.get("sort_by") as SearchParams["sortBy"],
      minRating: searchParams.get("min_rating")
        ? Number(searchParams.get("min_rating"))
        : 0,
      category:
        (searchParams.get("category") as SearchParams["category"]) || "popular",
    }),
    [searchParams]
  );

  const { movies, loading, error, hasMore, totalResults, loadMore, search } =
    useMovies(filters);

  const { genres = [], loading: genresLoading } = useGenres();

  useEffect(() => {
    search?.(filters);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const genresMap = useMemo(
    () =>
      genres.reduce((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
      }, {} as Record<number, string>),
    [genres]
  );

  const updateSearchParams = useCallback(
    (params: SearchParams) => {
      const newSearchParams = new URLSearchParams();

      if (params.query) newSearchParams.set("query", params.query);
      if (params.genreId)
        newSearchParams.set("genre", params.genreId.toString());
      if (params.year) newSearchParams.set("year", params.year.toString());
      if (params.sortBy) newSearchParams.set("sort_by", params.sortBy);
      if (params.minRating && params.minRating > 0)
        newSearchParams.set("min_rating", params.minRating.toString());
      if (params.category) newSearchParams.set("category", params.category);

      setSearchParams(newSearchParams);
    },
    [setSearchParams]
  );

  const handleSearch = useCallback(
    (query: string) => {
      console.log("masuk sini search");
      const newFilters = { ...filters, query };
      updateSearchParams(newFilters);
    },
    [filters, updateSearchParams]
  );

  const handleFilterChange = useCallback(
    (newFilters: Partial<SearchParams>) => {
      const updatedFilters = { ...filters, ...newFilters };
      updateSearchParams(updatedFilters);
    },
    [filters, updateSearchParams]
  );

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  return (
    <div className="container mx-auto px-4 py-4 max-w-[1400px]">
      <div className="mb-4">
        <div className="mt-4">
          <SearchBar
            initialValue={filters.query || ""}
            onSearch={handleSearch}
          />
        </div>

        <div className="mt-6">
          {!genresLoading && (
            <FilterBar
              genres={genres}
              onFilterChange={handleFilterChange}
              selectedGenreId={filters.genreId}
              selectedYear={filters.year}
              selectedSortBy={filters.sortBy}
              selectedMinRating={filters.minRating}
              selectedCategory={filters.category}
            />
          )}
        </div>

        {totalResults > 0 && (
          <p className="mt-4 text-gray-600">
            Found {formatNumber(totalResults)} result
            {totalResults !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {error ? (
        <div className="rounded-lg bg-red-50 p-4 text-center">
          <p className="text-red-600">{error.message}</p>
          <button
            onClick={() => search(filters)}
            className="mt-2 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div className="relative">
            <div className="hidden sm:block">
              <MovieGrid
                movies={movies}
                loading={loading}
                genresMap={genresMap}
                hasMore={hasMore}
                onLoadMore={loadMore}
              />
            </div>
            <div className="sm:hidden">
              <MovieList
                movies={movies}
                loading={loading}
                genresMap={genresMap}
                hasMore={hasMore}
                onLoadMore={loadMore}
              />
            </div>
          </div>
        </>
      )}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 rounded-full bg-blue-600 p-3 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
};

export default MovieListPage;
