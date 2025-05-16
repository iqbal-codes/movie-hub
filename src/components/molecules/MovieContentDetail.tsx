import { MovieDetails as MovieDetailsType } from "../../types/movie";
import Rating from "../atoms/Rating";
import {  Calendar, Clock, PlayCircle } from "lucide-react";
import { formatRuntime } from "../../utils/formatter";
import Button from "../atoms/Button";
import Badge from "../atoms/Badge";

type MovieContentDetailProps = {
  movie: MovieDetailsType;
  openTrailer: () => void;
};

const MovieContentDetail = ({
  movie,
  openTrailer,
}: MovieContentDetailProps) => {
  // Get the most relevant trailer (usually the official trailer)
  const trailer =
    movie.videos.results.find(
      (video) =>
        video.type === "Trailer" && video.site === "YouTube" && video.official
    ) ||
    movie.videos.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "";
  const directors = movie.credits.crew.filter(
    (crew) => crew.job === "Director"
  );

  return (
    <>
      <h1 className="text-2xl font-bold text-white md:text-4xl lg:text-5xl">
        {movie.title}
        {releaseYear && (
          <span className="ml-2 text-white">({releaseYear})</span>
        )}
      </h1>

      {movie.tagline && (
        <p className="mt-2 text-lg italic text-white/50 md:text-white/80">{movie.tagline}</p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <Rating
          average={movie.vote_average}
          count={movie.vote_count}
          max={10}
          size={20}
          className="p-1 text-white"
        />

        {movie.runtime && (
          <div className="flex items-center text-white">
            <Clock size={18} className="mr-1" />
            <span>{formatRuntime(movie.runtime)}</span>
          </div>
        )}

        {movie.release_date && (
          <div className="flex items-center text-white">
            <Calendar size={18} className="mr-1" />
            <span>
              {new Date(movie.release_date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {movie.genres.map((genre) => (
          <Badge key={genre.id} color="primary">
            {genre.name}
          </Badge>
        ))}
      </div>

      {trailer && (
        <div className="mt-6">
          <Button
            onClick={openTrailer}
            startIcon={<PlayCircle size={20} />}
            variant="primary"
          >
            Watch Trailer
          </Button>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-bold text-white">Overview</h2>
        <p className="mt-2 text-white font-light">{movie.overview}</p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {directors.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-white">
              Director{directors.length > 1 ? "s" : ""}
            </h3>
            <ul className="mt-1 text-white font-light">
              {directors.map((director) => (
                <li key={director.id}>{director.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default MovieContentDetail;
