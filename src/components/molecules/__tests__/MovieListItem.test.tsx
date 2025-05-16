import { render, screen } from "@testing-library/react";
import MovieListItem from "../MovieListItem";
import { useImageConfig } from "../../../contexts/ImageConfigContext";
import { Movie } from "../../../types/movie";

jest.mock("../../../contexts/ImageConfigContext", () => ({
  useImageConfig: jest.fn(),
}));

describe("MovieListItem Component", () => {
  const mockGetImageUrl = jest.fn();
  const defaultProps: { movie: Movie; onPlayTrailer: () => void } = {
    movie: {
      adult: false,
      backdrop_path: "/path/to/backdrop.jpg",
      genre_ids: [28, 12, 16],
      original_language: "en",
      overview: "A test movie description",
      popularity: 100.5,
      id: 1,
      title: "Test Movie",
      poster_path: "/path/to/poster.jpg",
      vote_average: 8.5,
      vote_count: 1000,
      release_date: "2023-01-01",
    },
    onPlayTrailer: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useImageConfig as jest.Mock).mockReturnValue({
      getImageUrl: mockGetImageUrl,
    });
    mockGetImageUrl.mockReturnValue("https://example.com/image.jpg");
  });

  it("renders image with correct attributes", () => {
    render(<MovieListItem {...defaultProps} />);

    const image = screen.getByAltText("Test Movie poster") as HTMLImageElement;
    expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveClass("w-full", "h-full", "object-cover");
  });

  it("renders rating component with correct props", () => {
    render(<MovieListItem {...defaultProps} />);

    expect(screen.getByText("8.5 (1k)")).toBeInTheDocument();
  });

  it("applies correct link attributes", () => {
    render(<MovieListItem {...defaultProps} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/${defaultProps.movie.id}`);
  });
});
