import React, { useRef, useEffect } from "react";
import { Movie } from "../../types/movie";
import MovieCard from "../molecules/MovieCard";
import LoadingGrid from "../molecules/LoadingGrid";
import { useIntersectionObserver } from "../../hooks/utils/useIntersectionObserver";

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  hasMore: boolean;
  genresMap: Record<number, string>;
  onLoadMore: () => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  loading,
  hasMore,
  genresMap,
  onLoadMore,
}) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(loadMoreRef);

  // Load more movies when the loadMoreRef element is visible
  useEffect(() => {
    if (isIntersecting && hasMore && !loading) {
      onLoadMore();
    }
  }, [isIntersecting, hasMore, loading, onLoadMore]);

  if (movies.length === 0 && !loading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg bg-gray-50">
        <p className="text-center text-lg text-gray-500">
          No movies found. Try adjusting your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} genresMap={genresMap} />
        ))}
      </div>

      {loading && <LoadingGrid />}

      {hasMore && (
        <div
          ref={loadMoreRef}
          className="flex h-20 items-center justify-center"
        >
          {loading ? (
            <p className="text-gray-500">Loading more movies...</p>
          ) : (
            <p className="text-sm text-gray-400">Scroll for more</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieGrid;
