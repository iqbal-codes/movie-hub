import { renderHook, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { useMovies } from "../queries/useMovies";
import api from "../../services/api";

// Create a new instance of MockAdapter
const mock = new MockAdapter(api);

describe("useMovies", () => {
  afterEach(() => {
    mock.reset();
  });

  it("should fetch and return movies", async () => {
    const mockMovies = [{ id: 1, title: "Inception" }];
    mock.onGet("/discover/movie").reply(200, { results: mockMovies });

    const { result } = renderHook(() => useMovies());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.movies).toEqual(mockMovies);
    expect(result.current.error).toBeNull();
  });

  it("should handle error if request fails", async () => {
    mock.onGet("/discover/movie").networkError();

    const { result } = renderHook(() => useMovies());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.movies).toEqual([]);
    expect(result.current.error?.message).toBe("Network Error");
  });
});
