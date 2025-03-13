"use client";

import { Product } from "@/type";
import React, { useEffect, useState } from "react";
import ProductImage from "./ProductImage";
import AddToCartBtn from "./ui/AddToCartBtn";
import { store } from "@/lib/store";
import ProductRating from "./ProductRating";
import ProductAvailability from "./ProductAvailability";
import ProductPrice from "./ProductPrice";
import toast from "react-hot-toast";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

const SingleProduct = ({ product }: { product: Product }) => {
  const { favoriteProduct, addToFavorite } = store();
  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    const isFavorite = favoriteProduct.some((item) => item.id === product?.id);
    setIsInFavorites(isFavorite);
  }, [product, favoriteProduct]);

  const handleToggleFavorite = () => {
    addToFavorite(product).then(() => {
      toast.success(
        isInFavorites
          ? `${product.title} removed from favorites!`
          : `${product.title} added to favorites!`
      );
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-6">
      {/* Product Images */}
      <ProductImage product={product} />

      {/* Product Details */}
      <div className="flex flex-col space-y-6">
        {/* Title and Brand */}
        <div>
          <h1 className="text-3xl font-bold tracking-wide">{product.title}</h1>
          <p className="text-gray-500 mt-1">Brand: {product.brand}</p>
        </div>

        {/* Rating */}
        <ProductRating rating={product.rating} />

        {/* Price Info */}
        <ProductPrice
          price={product.price}
          discountPercentage={product.discountPercentage}
        />

        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-4 border-t border-b py-4">
          <div>
            <p className="text-gray-500">Category</p>
            <p className="font-medium capitalize">{product.category}</p>
          </div>
          <div>
            <p className="text-gray-500">Stock</p>
            <ProductAvailability stock={product.stock} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          {/* Add to Cart with quantity */}
          <div className="flex-1">
            <AddToCartBtn
              product={product}
              className="w-full"
              showSubtotal={true}
            />
          </div>

          {/* Toggle Favorites */}
          <button
            onClick={handleToggleFavorite}
            className={`flex items-center justify-center gap-2 py-2 px-4 border rounded-xl transition-colors ${
              isInFavorites
                ? "bg-red-50 border-red-200 text-red-500"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            {isInFavorites ? (
              <>
                <MdFavorite className="text-red-500" size={20} />
                <span className="hidden sm:inline">Remove from Favorites</span>
              </>
            ) : (
              <>
                <MdFavoriteBorder size={20} />
                <span className="hidden sm:inline">Add to Favorites</span>
              </>
            )}
          </button>
        </div>

        {/* Additional Details (optional) */}
        {product.tags && (
          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {product.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
