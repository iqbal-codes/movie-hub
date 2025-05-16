import { render, screen } from "@testing-library/react";
import LoadingGrid from "../LoadingGrid";

describe("LoadingGrid Component", () => {
  it("renders correct number of skeleton items", () => {
    render(<LoadingGrid count={4} />);

    const skeletonItems = screen.getAllByTestId("skeleton-item");
    expect(skeletonItems).toHaveLength(4);
  });

  it("renders with default count when no count prop is provided", () => {
    render(<LoadingGrid />);

    const skeletonItems = screen.getAllByTestId("skeleton-item");
    expect(skeletonItems).toHaveLength(4); // Default count
  });

  it("renders skeleton items with animation", () => {
    render(<LoadingGrid count={1} />);

    const skeletonElements = screen.getAllByTestId("skeleton");
    skeletonElements.forEach((element) => {
      expect(element).toHaveClass("animate-pulse");
    });
  });
});
