import React, { useState } from "react";
import { MovieDetails as MovieDetailsType } from "../../types/movie";
import TrailerModal from "../molecules/TrailerModal";
import { useImageConfig } from "../../contexts/ImageConfigContext";
import MovieContentDetail from "../molecules/MovieContentDetail";
import MovieCard from "../molecules/MovieCard";
import CastCard from "../molecules/CastCard";

interface MovieDetailsProps {
  movie: MovieDetailsType;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  const { getImageUrl } = useImageConfig();
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  // Get the most relevant trailer (usually the official trailer)
  const trailer =
    movie.videos.results.find(
      (video) =>
        video.type === "Trailer" && video.site === "YouTube" && video.official
    ) ||
    movie.videos.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

  const topCast = movie.credits.cast.slice(0, 10);

  return (
    <div className="relative">
      <div>
        <div className="relative w-full flex">
          <div className="relative z-10 p-4 md:py-8 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-3 lg:grid-cols-4 flex flex-row gap-8">
              {/* Poster */}
              <div className="col-span-1">
                <div className="relative overflow-hidden rounded-lg shadow-xl">
                  <img
                    src={getImageUrl(movie.poster_path, "poster", "xl")}
                    alt={`${movie.title} poster`}
                    className="h-auto w-full"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="col-span-2 lg:col-span-3 hidden md:block">
                <MovieContentDetail
                  movie={movie}
                  openTrailer={() => setIsTrailerOpen(true)}
                />
              </div>
            </div>
          </div>

          {/* Backdrop and Overlay */}
          {movie.backdrop_path && (
            <div className="absolute inset-0 z-0">
              <img
                src={getImageUrl(movie.backdrop_path, "backdrop")}
                alt={`${movie.title} backdrop`}
                className="h-full w-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/70" />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Details */}
      <div className="block md:hidden p-4 bg-black/80">
        <MovieContentDetail
          movie={movie}
          openTrailer={() => setIsTrailerOpen(true)}
        />
      </div>

      <div className="max-w-[1400px] mb-4 mt-16 mx-auto">
        {/* Top Cast Section */}
        {topCast.length > 0 && (
          <div>
            <h2 className="mb-6 text-2xl font-bold text-gray-900 px-4">Top Cast</h2>
            <div className="flex overflow-x-scroll gap-4 py-2 px-4">
              {topCast.map((castMember) => (
                <CastCard castMember={castMember} key={castMember.id} />
              ))}
            </div>
          </div>
        )}
        {/* Similar Movies Section */}
        {movie.similar.results.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 px-4">
              Similar Movies
            </h2>
            <div className="flex overflow-x-auto gap-4 py-2 px-4">
              {movie.similar.results.slice(0, 10).map((similarMovie) => (
                <MovieCard
                  key={similarMovie.id}
                  movie={similarMovie}
                  className="w-[200px] flex-none"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      {trailer && (
        <TrailerModal
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
          videoKey={trailer.key}
          title={`${movie.title} - Trailer`}
        />
      )}
    </div>
  );
};

export default MovieDetails;
