import { useState, useEffect } from 'react';
import { Genre } from '../../types/movie';
import { getGenres } from '../../services/api';

interface UseGenresReturn {
  genres: Genre[];
  loading: boolean;
  error: Error | null;
}

export const useGenres = (): UseGenresReturn => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const data = await getGenres();
        setGenres(data.genres);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch genres'));
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, loading, error };
};