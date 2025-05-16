import React from "react";
import Skeleton from "../atoms/Skeleton";
import { useScreenSize } from "../../hooks/utils/useScreenSize";

interface LoadingGridProps {
  count?: number;
  columns?: number;
}

const skeletonCountMap: Record<string, number> = {
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  "2xl": 5,
};

const LoadingGrid: React.FC<LoadingGridProps> = ({ count, columns }) => {
  const screenSize = useScreenSize();

  return (
    <div
      data-testid="loading-grid"
      className={`grid gap-6 grid-cols-${columns || 1} ${
        !columns
          ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          : ""
      }`}
    >
      {Array.from({
        length: count ? count : skeletonCountMap[screenSize] || 5,
      }).map((_, index) => (
        <div key={index} className="flex flex-col" data-testid="skeleton-item">
          <Skeleton
            variant="rectangular"
            className="aspect-[2/3] rounded-lg"
          />
          <Skeleton
            variant="text"
            className="mt-3"
            height="1.5rem"
          />
          <Skeleton
            variant="text"
            width="60%"
            className="mt-2"
            height="1rem"
          />
          <div className="mt-2 flex">
            <Skeleton
              variant="text"
              width="40%"
              height="1rem"
              className="mr-2"
            />
            <Skeleton variant="text" width="40%" height="1rem" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingGrid;
