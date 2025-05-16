import { renderHook, waitFor } from "@testing-library/react";;
import MockAdapter from "axios-mock-adapter";
import { useGenres } from "../queries/useGenres";
import api from "../../services/api";

// Create a new instance of MockAdapter
const mock = new MockAdapter(api);

describe("useGenres", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch and return genres", async () => {
    const mockGenres = [{ id: 28, name: "Action" }];
    mock.onGet("/genre/movie/list").reply(200, { genres: mockGenres });

    const { result } = renderHook(() => useGenres());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.genres).toEqual(mockGenres);
    expect(result.current.error).toBeNull();
  });

  it("should handle error if request fails", async () => {
    mock.onGet("/genre/movie/list").networkError();

    const { result } = renderHook(() => useGenres());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.genres).toEqual([]);
    expect(result.current.error?.message).toBe("Network Error");
  });
});
