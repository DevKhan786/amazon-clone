import React from "react";

interface ProductPriceProps {
  price: number;
  discountPercentage: number;
}

const ProductPrice = ({ price, discountPercentage }: ProductPriceProps) => {
  // Calculate original price if there's a discount
  const originalPrice =
    discountPercentage > 0
      ? (price / (1 - discountPercentage / 100)).toFixed(2)
      : null;

  return (
    <div className="flex flex-col">
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold">${price.toFixed(2)}</span>

        {discountPercentage > 0 && (
          <span className="text-lg text-gray-400 line-through">
            ${originalPrice}
          </span>
        )}
      </div>

      {discountPercentage > 0 && (
        <div className="flex items-center mt-1">
          <span className="bg-green-100 text-green-700 text-sm px-2 py-0.5 rounded-md font-medium">
            {discountPercentage.toFixed(0)}% OFF
          </span>
          <span className="text-sm text-gray-500 ml-2">
            You save: ${(Number(originalPrice) - price).toFixed(2)}
          </span>
        </div>
      )}

      <p className="text-sm text-gray-500 mt-2">
        Free shipping on orders over $50
      </p>
    </div>
  );
};

export default ProductPrice;
