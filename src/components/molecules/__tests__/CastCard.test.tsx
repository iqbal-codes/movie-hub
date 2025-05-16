import { render, screen } from "@testing-library/react";
import CastCard from "../CastCard";
import { useImageConfig } from "../../../contexts/ImageConfigContext";
import { CastMember } from "../../../types/movie";

// Mock the ImageConfigContext
jest.mock("../../../contexts/ImageConfigContext", () => ({
  useImageConfig: jest.fn(),
}));

describe("CastCard Component", () => {
  const mockGetImageUrl = jest.fn();
  const defaultProps: { castMember: CastMember } = {
    castMember: {
      adult: false,
      gender: 2,
      known_for_department: "Acting",
      original_name: "John Doe",
      id: 1,
      name: "John Doe",
      character: "Character Name",
      profile_path: "/path/to/profile.jpg",
      popularity: 10.5,
      cast_id: 1,
      credit_id: "abc123",
      order: 1,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useImageConfig as jest.Mock).mockReturnValue({
      getImageUrl: mockGetImageUrl,
    });
    mockGetImageUrl.mockReturnValue("https://example.com/image.jpg");
  });

  it("renders cast member information correctly", () => {
    render(<CastCard {...defaultProps} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Character Name")).toBeInTheDocument();
    expect(screen.getByAltText("John Doe profile")).toBeInTheDocument();
  });

  it("renders image with correct attributes", () => {
    render(<CastCard {...defaultProps} />);

    const image = screen.getByAltText("John Doe profile") as HTMLImageElement;
    expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveClass("w-full", "h-full", "object-cover");
  });

  it("applies correct styling classes", () => {
    render(<CastCard {...defaultProps} />);

    const card = screen.getByRole("link");
    expect(card).toHaveClass("block");
    expect(card.parentElement).toHaveClass(
      "group",
      "flex-none",
      "rounded-lg",
      "shadow-sm",
      "w-[140px]",
      "overflow-hidden"
    );
  });

  it("truncates long names and character names", () => {
    const propsWithLongText = {
      castMember: {
        ...defaultProps.castMember,
        name: "Very Long Actor Name That Should Be Truncated",
        character: "Very Long Character Name That Should Be Truncated",
      },
    };

    render(<CastCard {...propsWithLongText} />);

    const name = screen.getByText(
      "Very Long Actor Name That Should Be Truncated"
    );
    const character = screen.getByText(
      "Very Long Character Name That Should Be Truncated"
    );

    expect(name).toHaveClass("line-clamp-2");
    expect(character).toHaveClass("line-clamp-2");
  });
});
