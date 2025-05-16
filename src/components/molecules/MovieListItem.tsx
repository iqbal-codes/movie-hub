import React from "react";
import { CalendarDays } from "lucide-react";
import { Movie } from "../../types/movie";
import Rating from "../atoms/Rating";
import Badge from "../atoms/Badge";
import { useImageConfig } from "../../contexts/ImageConfigContext";

interface MovieListItemProps {
  movie: Movie;
  genresMap?: Record<number, string>;
}

const MovieListItem: React.FC<MovieListItemProps> = ({ movie, genresMap }) => {
  const { getImageUrl } = useImageConfig();
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Unknown";

  return (
    <a
      href={`/${movie.id}`}
      className="flex gap-4 rounded-lg bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-md border border-gray-200 hover:border-gray-300 cursor-pointer"
      aria-label={`View details for ${movie.title}`}
    >
      <div className="h-32 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-200">
        <img
          src={getImageUrl(movie.poster_path, "poster")}
          alt={`${movie.title} poster`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="line-clamp-2 font-bold text-gray-900">{movie.title}</h3>

        <div className="mt-1 flex items-center text-sm text-gray-500">
          <CalendarDays size={14} className="mr-1" />
          <span>{releaseYear}</span>
        </div>

        <div className="mt-2">
          <Rating
            average={movie.vote_average}
            count={movie.vote_count}
            size={14}
          />
        </div>

        <div className="mt-2 flex flex-wrap gap-1">
          {genresMap &&
            movie.genre_ids &&
            movie.genre_ids.slice(0, 3).map(
              (genreId) =>
                genresMap[genreId] && (
                  <Badge key={genreId} color="primary" size="sm">
                    {genresMap[genreId]}
                  </Badge>
                )
            )}
        </div>
      </div>
    </a>
  );
};

export default MovieListItem;
