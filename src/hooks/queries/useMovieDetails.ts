import { useState, useEffect } from 'react';
import { getMovieDetails } from '../../services/api';
import { MovieDetails } from '../../types/movie';


interface UseMovieDetailsReturn {
  movie: MovieDetails | null;
  loading: boolean;
  error: Error | null;
}

export const useMovieDetails = (id: number): UseMovieDetailsReturn => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getMovieDetails(id);
        
        if (isMounted) {
          setMovie(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch movie details'));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMovieDetails();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { movie, loading, error };
};