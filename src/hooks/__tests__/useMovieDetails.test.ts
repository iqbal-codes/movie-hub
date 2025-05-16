import { renderHook, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { useMovieDetails } from "../queries/useMovieDetails";
import api from "../../services/api";

// Create a new instance of MockAdapter
const mock = new MockAdapter(api);

describe("useMovieDetails", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch and return movie details", async () => {
    const mockDetails = { id: 1, title: "Inception" };
    mock.onGet("/movie/1").reply(200, mockDetails);

    const { result } = renderHook(() => useMovieDetails(1));
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.movie).toEqual(mockDetails);
    expect(result.current.error).toBeNull();
  });

  it("should handle error if request fails", async () => {
    mock.onGet("/movie/1").networkError();

    const { result } = renderHook(() => useMovieDetails(1));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.movie).toBeNull();
    expect(result.current.error?.message).toBe("Network Error");
  });
});
