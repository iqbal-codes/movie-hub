import { render, screen } from "@testing-library/react";
import MovieCard from "../MovieCard";
import { useImageConfig } from "../../../contexts/ImageConfigContext";
import { Movie } from "../../../types/movie";

jest.mock("../../../contexts/ImageConfigContext", () => ({
  useImageConfig: jest.fn(),
}));

describe("MovieCard Component", () => {
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

  it("renders movie information correctly", () => {
    render(<MovieCard {...defaultProps} />);

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
    expect(screen.getByTestId("rating")).toBeInTheDocument();
  });

  it("renders image with correct attributes", () => {
    render(<MovieCard {...defaultProps} />);

    const image = screen.getByAltText("Test Movie poster") as HTMLImageElement;
    expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveClass("h-full object-cover transition-transform duration-300 group-hover:scale-105");
  });

  it("formats release year correctly", () => {
    const propsWithDifferentDate = {
      ...defaultProps,
      movie: {
        ...defaultProps.movie,
        release_date: "2024-12-31",
      },
    };

    render(<MovieCard {...propsWithDifferentDate} />);
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("applies correct link attributes", () => {
    render(<MovieCard {...defaultProps} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/${defaultProps.movie.id}`);
    expect(link).toHaveClass("group rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-md border border-gray-200 hover:border-gray-300 cursor-pointer");
  });

  it("renders rating component with correct props", () => {
    render(<MovieCard {...defaultProps} />);

    expect(screen.getByText("8.5 (1k)")).toBeInTheDocument();
  });
});
