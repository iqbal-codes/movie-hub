import React, { useRef, useEffect } from "react";
import { Movie } from "../../types/movie";
import MovieListItem from "../molecules/MovieListItem";
import { useIntersectionObserver } from "../../hooks/utils/useIntersectionObserver";
import LoadingList from "../molecules/LoadingList";

interface MovieListProps {
  movies: Movie[];
  genresMap: Record<number, string>;
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
  genresMap,
  loading = false,
  hasMore = false,
  onLoadMore,
}) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(loadMoreRef);

  useEffect(() => {
    if (isIntersecting && hasMore && !loading && onLoadMore) {
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
    <div className="flex flex-col gap-4">
      {movies.map((movie, idx) => (
        <MovieListItem
          key={`${movie.id}-${idx}`}
          movie={movie}
          genresMap={genresMap}
        />
      ))}

      {loading && <LoadingList />}

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

export default MovieList;
