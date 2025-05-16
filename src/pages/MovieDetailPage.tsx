import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import MovieDetails from "../components/organisms/MovieDetails";
import Button from "../components/atoms/Button";
import Skeleton from "../components/atoms/Skeleton";
import { useMovieDetails } from "../hooks/queries/useMovieDetails";

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = id ? parseInt(id, 10) : 0;

  const { movie, loading, error } = useMovieDetails(movieId);

  useEffect(() => {
    // Update document title when movie details are loaded
    if (movie) {
      document.title = `${movie.title} | MovieHub`;
    }

    return () => {
      document.title = "MovieHub";
    };
  }, [movie]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold text-red-600">Error Loading Movie</h2>
        <p className="mt-2 text-gray-600">{error.message}</p>
        <div className="mt-6 flex justify-center space-x-4">
          <Button onClick={handleGoBack}>Go Back</Button>
          <Button onClick={() => window.location.reload()} variant="secondary">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {loading || !movie ? (
        <div className="pt-4">
          <div className="w-full animate-pulse bg-gray-200" />
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div>
                <Skeleton height="450px" className="rounded-lg" />
              </div>
              <div className="md:col-span-2 space-y-4">
                <Skeleton height="3rem" width="70%" />
                <Skeleton height="1.5rem" width="50%" />
                <Skeleton height="1rem" width="30%" />
                <div className="flex space-x-2">
                  <Skeleton height="1.5rem" width="60px" />
                  <Skeleton height="1.5rem" width="60px" />
                  <Skeleton height="1.5rem" width="60px" />
                </div>
                <Skeleton height="6rem" />
                <Skeleton height="10rem" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <MovieDetails movie={movie} />
      )}
    </div>
  );
};

export default MovieDetailPage;
