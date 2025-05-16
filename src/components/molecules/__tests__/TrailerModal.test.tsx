import { render, screen, fireEvent } from "@testing-library/react";
import TrailerModal from "../TrailerModal";

describe("TrailerModal Component", () => {
  const defaultProps = {
    title: "Test Movie",
    isOpen: true,
    onClose: jest.fn(),
    videoKey: "test-video-key",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders when isOpen is true", () => {
    render(<TrailerModal {...defaultProps} />);

    expect(screen.getByTestId("modal-content")).toBeInTheDocument();
    expect(screen.getByTestId("modal-overlay")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    render(<TrailerModal {...defaultProps} isOpen={false} />);

    expect(screen.queryByTestId("modal-content")).not.toBeInTheDocument();
    expect(screen.queryByTestId("modal-overlay")).not.toBeInTheDocument();
  });

  it("calls onClose when clicking the close button", () => {
    render(<TrailerModal {...defaultProps} />);

    const closeButton = screen.getByTestId("close-button");
    fireEvent.click(closeButton);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when clicking the overlay", () => {
    render(<TrailerModal {...defaultProps} />);

    const overlay = screen.getByTestId("modal-overlay");
    fireEvent.click(overlay);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("renders YouTube iframe with correct attributes", () => {
    render(<TrailerModal {...defaultProps} />);

    const iframe = screen.getByTitle(
      "Test Movie Trailer"
    ) as HTMLIFrameElement;
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      "src",
      `https://www.youtube.com/embed/${defaultProps.videoKey}?autoplay=1`
    );
    expect(iframe).toHaveAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
    expect(iframe).toHaveAttribute("allowFullScreen");
  });

  it("handles missing videoKey prop", () => {
    render(<TrailerModal {...defaultProps} videoKey="" />);

    const iframe = screen.getByTitle(
      "Test Movie Trailer"
    ) as HTMLIFrameElement;
    expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/?autoplay=1"
    );
  });

  it("maintains aspect ratio on resize", () => {
    render(<TrailerModal {...defaultProps} />);

    const container = screen.getByTestId("modal-content");
    expect(container).toHaveClass("aspect-video");
  });
});
