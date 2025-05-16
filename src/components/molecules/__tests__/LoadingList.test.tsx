import { render, screen } from "@testing-library/react";
import LoadingList from "../LoadingList";

describe("LoadingList Component", () => {
  it("renders skeleton items with animation", () => {
    render(<LoadingList />);

    const skeletonElements = screen.getAllByTestId("skeleton");
    skeletonElements.forEach((element) => {
      expect(element).toHaveClass("animate-pulse");
    });
  });
});
