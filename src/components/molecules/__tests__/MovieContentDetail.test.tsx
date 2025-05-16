import { render, screen } from "@testing-library/react";
import MovieContentDetail from "../MovieContentDetail";
import { MovieDetails } from "../../../types/movie";

describe("MovieContentDetail Component", () => {
  const defaultProps: { movie: MovieDetails; openTrailer: () => void } = {
    movie: {
      videos: { results: [] },
      credits: { cast: [], crew: [] },
      similar: { results: [] },
      budget: 0,
      genres: [
        { id: 28, name: "Action" },
        { id: 18, name: "Drama" },
      ],
      homepage: "",
      imdb_id: "",
      production_companies: [],
      production_countries: [],
      revenue: 0,
      runtime: 120,
      spoken_languages: [],
      status: "",
      tagline: "Test tagline",
      id: 1,
      title: "Test Movie",
      release_date: "2023-01-01",
      vote_average: 8.5,
      vote_count: 1000,
      overview: "A test movie description.",
      poster_path: "/test-poster.jpg",
      backdrop_path: "/test-backdrop.jpg",
      genre_ids: [28, 18], // Action and Drama genre IDs
      popularity: 100,
      adult: false,
      original_language: "en",
    },
    openTrailer: jest.fn(),
  };

  it("renders movie title correctly", () => {
    render(<MovieContentDetail {...defaultProps} />);
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("Test Movie")).toHaveClass("text-2xl font-bold text-white md:text-4xl lg:text-5xl");
  });

  it("renders release year correctly", () => {
    render(<MovieContentDetail {...defaultProps} />);
    expect(screen.getByText("January 1, 2023")).toBeInTheDocument();
  });

  it("formats runtime correctly", () => {
    render(<MovieContentDetail {...defaultProps} />);
    expect(screen.getByText("2h 0m")).toBeInTheDocument();
  });

  it("renders genres as badges", () => {
    render(<MovieContentDetail {...defaultProps} />);

    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Drama")).toBeInTheDocument();
  });

  it("renders rating component with correct props", () => {
    render(<MovieContentDetail {...defaultProps} />);

    expect(screen.getByText("8.5 (1k)")).toBeInTheDocument();
  });

  it("renders tagline when provided", () => {
    render(<MovieContentDetail {...defaultProps} />);
    expect(screen.getByText("Test tagline")).toBeInTheDocument();
    expect(screen.getByText("Test tagline")).toHaveClass(
      "text-white/50",
      "italic"
    );
  });

  it("renders overview correctly", () => {
    render(<MovieContentDetail {...defaultProps} />);
    expect(screen.getByText("A test movie description.")).toBeInTheDocument();
  });
});
