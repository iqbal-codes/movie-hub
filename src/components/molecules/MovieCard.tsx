import React from "react";
import { CalendarDays } from "lucide-react";
import { Movie } from "../../types/movie";
import Rating from "../atoms/Rating";
import Badge from "../atoms/Badge";
import { useImageConfig } from "../../contexts/ImageConfigContext";

interface MovieCardProps {
  movie: Movie;
  genresMap?: Record<number, string>;
  className?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  genresMap,
  className,
}) => {
  const { getImageUrl } = useImageConfig();
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Unknown";

  return (
    <a
      href={`/${movie.id}`}
      className={`group rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-md border border-gray-200 hover:border-gray-300 cursor-pointer ${className}`}
      aria-label={`View details for ${movie.title}`}
    >
      <div className={`aspect-[2/3] overflow-hidden bg-gray-200 rounded-t-lg`}>
        <img
          src={getImageUrl(movie.poster_path, "poster", "lg")}
          alt={`${movie.title} poster`}
          className={`h-full object-cover transition-transform duration-300 group-hover:scale-105`}
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 font-bold text-gray-900 group-hover:text-blue-600">
          {movie.title}
        </h3>

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

        {genresMap &&
          movie.genre_ids &&
          movie.genre_ids.map(
            (genreId) =>
              genresMap[genreId] && (
                <Badge
                  key={genreId}
                  color="primary"
                  size="sm"
                  className="mr-1 mt-2"
                >
                  {genresMap[genreId]}
                </Badge>
              )
          )}
      </div>
    </a>
  );
};

export default MovieCard;
