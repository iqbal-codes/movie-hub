import { render, screen, fireEvent, act } from "@testing-library/react";
import SearchBar from "../SearchBar";

jest.useFakeTimers();

describe("SearchBar Component", () => {
  const defaultProps = {
    value: "",
    onSearch: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders search input with correct attributes", () => {
    render(<SearchBar {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search movies...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveValue("");
  });

  it("updates input value on change", () => {
    render(<SearchBar {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search movies...");
    fireEvent.change(input, { target: { value: "test" } });

    expect(input).toHaveValue("test");
  });

  it("renders search icon", () => {
    render(<SearchBar {...defaultProps} />);

    const searchIcon = screen.getByTestId("search-icon");
    expect(searchIcon).toBeInTheDocument();
    expect(searchIcon).toHaveClass("w-5", "h-5", "text-gray-400");
  });

  it("maintains input focus styles", () => {
    render(<SearchBar {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search movies...");
    fireEvent.focus(input);

    expect(input).toHaveClass("focus:outline-none", "focus:ring-1");
  });

  it("renders with initial value", () => {
    render(<SearchBar {...defaultProps} initialValue="initial" />);

    const input = screen.getByPlaceholderText("Search movies...");
    expect(input).toHaveValue("initial");
  });

  it("handles empty string search", () => {
    render(<SearchBar {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search movies...");
    fireEvent.change(input, { target: { value: "" } });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(defaultProps.onSearch).toHaveBeenCalledWith("");
  });
});
