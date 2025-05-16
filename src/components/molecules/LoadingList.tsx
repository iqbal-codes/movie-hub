import React from "react";
import Skeleton from "../atoms/Skeleton";

const LoadingList: React.FC = () => {
  return (
    <div className="flex flex-col gap-4" data-testid="skeleton-item">
      <div className="flex gap-4 rounded-lg bg-white p-3 shadow-sm border border-gray-200">
        {/* Poster skeleton */}
        <div className="h-32 w-24 flex-shrink-0">
          <Skeleton
            variant="rectangular"
            className="h-full w-full rounded-md"
          />
        </div>

        {/* Content skeleton */}
        <div className="flex flex-1 flex-col">
          {/* Title */}
          <Skeleton variant="text" height="1.5rem" className="w-3/4" />

          {/* Year */}
          <div className="mt-1 flex items-center">
            <Skeleton variant="text" width="100px" height="1rem" />
          </div>

          {/* Rating */}
          <div className="mt-2">
            <Skeleton variant="text" width="120px" height="1rem" />
          </div>

          {/* Genres */}
          <div className="mt-2 flex gap-2">
            <Skeleton variant="text" width="60px" height="1.5rem" />
            <Skeleton variant="text" width="80px" height="1.5rem" />
            <Skeleton variant="text" width="70px" height="1.5rem" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingList;
