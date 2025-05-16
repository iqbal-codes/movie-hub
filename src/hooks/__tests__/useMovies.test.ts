import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useMovies } from '../queries/useMovies';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useMovies', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch and return movies', async () => {
    const mockMovies = [{ id: 1, title: 'Inception' }];
    mockedAxios.get.mockResolvedValueOnce({ data: { results: mockMovies } });

    const { result } = renderHook(() => useMovies());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(mockedAxios.get).toHaveBeenCalledWith('/movie/popular');
    expect(result.current.movies).toEqual(mockMovies);
    expect(result.current.error).toBeNull();
  });

  it('should handle error if request fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    const { result } = renderHook(() => useMovies());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.movies).toEqual([]);
    expect(result.current.error?.message).toBe('Network Error');
  });
});