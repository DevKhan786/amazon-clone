import React from "react";
import { Star, StarHalf } from "lucide-react";

interface ProductRatingProps {
  rating: number;
}

const ProductRating = ({ rating }: ProductRatingProps) => {
  // Generate an array of 5 stars with filled, half, or empty status
  const stars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return (
      <span key={index}>
        {rating >= index + 1 ? (
          <Star className="fill-yellow-400 text-yellow-400" size={20} />
        ) : rating >= number ? (
          <StarHalf className="fill-yellow-400 text-yellow-400" size={20} />
        ) : (
          <Star className="text-gray-300" size={20} />
        )}
      </span>
    );
  });

  return (
    <div className="flex items-center gap-1">
      <div className="flex">{stars}</div>
      <span className="ml-1 text-gray-600 text-sm">{rating.toFixed(1)}/5</span>
    </div>
  );
};

export default ProductRating;
