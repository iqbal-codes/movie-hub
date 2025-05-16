import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar from "../FilterBar";
import { SearchParams } from "../../../types/movie";

describe("FilterBar Component", () => {
  const defaultProps = {
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 16, name: "Animation" },
    ],
    selectedGenreId: 28,
    selectedYear: 2023,
    selectedCategory: "popular" as SearchParams['category'],
    selectedMinRating: 0,
    onFilterChange: jest.fn(),
  };

  const defaultFilters = {
    category: defaultProps.selectedCategory,
    genreId: defaultProps.selectedGenreId,
    year: defaultProps.selectedYear,
    minRating: defaultProps.selectedMinRating,
    sortBy: undefined,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all filter dropdowns", () => {
    render(<FilterBar {...defaultProps} />);

    expect(screen.getByText("Category: Popular")).toBeInTheDocument();
    expect(screen.getByText("Genre: Action")).toBeInTheDocument();
    expect(screen.getByText("Year: 2023")).toBeInTheDocument();
    expect(screen.getByText("Rating: Any Rating")).toBeInTheDocument();
  });

  it("calls onFilterChange when genre option changes", () => {
    render(<FilterBar {...defaultProps} />);

    const genreDropdown = screen.getByText("Genre: Action");
    fireEvent.click(genreDropdown);

    const option = screen.getByText("Adventure");
    fireEvent.click(option);

    expect(defaultProps.onFilterChange).toHaveBeenCalledWith({
      ...defaultFilters,
      genreId: 12,
    });
  });

  it("calls onFilterChange when year option changes", () => {
    render(<FilterBar {...defaultProps} />);

    const yearDropdown = screen.getByText("Year: 2023");
    fireEvent.click(yearDropdown);

    const option = screen.getByText("2024");
    fireEvent.click(option);

    expect(defaultProps.onFilterChange).toHaveBeenCalledWith({
      ...defaultFilters,
      year: 2024,
    });
  });

  it("calls onFilterChange when category option changes", () => {
    render(<FilterBar {...defaultProps} />);

    const categoryDropdown = screen.getByText("Category: Popular");
    fireEvent.click(categoryDropdown);

    const option = screen.getByText("Top Rated");
    fireEvent.click(option);

    expect(defaultProps.onFilterChange).toHaveBeenCalledWith({
      ...defaultFilters,
      category: "top_rated",
    });
  });

  it("displays selected filter values", () => {
    const selectedProps = {
      ...defaultProps,
      ...defaultFilters,
    };

    render(<FilterBar {...selectedProps} />);

    expect(screen.getByText("Category: Popular")).toBeInTheDocument();
    expect(screen.getByText("Genre: Action")).toBeInTheDocument();
    expect(screen.getByText("Year: 2023")).toBeInTheDocument();
    expect(screen.getByText("Rating: Any Rating")).toBeInTheDocument();
  });
});
