import React from "react";
import { Star } from "lucide-react";
import { formatNumberThousand } from "../../utils/formatter";

interface RatingProps {
  average: number;
  count?: number;
  max?: number;
  size?: number;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  average = 0,
  count = 0,
  size = 16,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center ${className} gap-1`}
      data-testid="rating"
    >
      <Star
        data-testid="star-icon"
        key={`star`}
        size={size}
        className="text-yellow-400 fill-yellow-400"
      />
      <div>
        {average.toFixed(1)} ({formatNumberThousand(count)})
      </div>
    </div>
  );
};

export default Rating;
