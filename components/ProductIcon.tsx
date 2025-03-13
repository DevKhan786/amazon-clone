"use client";
import { store } from "@/lib/store";
import { Product } from "@/type";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

const ProductIcon = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  const { favoriteProduct, addToFavorite } = store();
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const availableProduct = favoriteProduct?.find(
      (item) => item?.id === product?.id
    );
    setExistingProduct(availableProduct || null);
  }, [product, favoriteProduct]);
  
  const handleFavourite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (product) {
      addToFavorite(product).then(() => {
        toast.success(
          existingProduct
            ? `${product?.title.substring(0, 10)} removed successfully!`
            : `${product?.title.substring(0, 10)} added successfully!`
        );
      });
    }
  };
  return (
    <div className="absolute top-2 right-2 flex items-center gap-2">
      <p className="bg-transparent text-xs rounded-full p-1 duration-300 transition-all  border group-hover:bg-black group-hover:text-white">
        {product?.discountPercentage}%
      </p>
      <span
        onClick={handleFavourite}
        className="text-xl z-40 border border-black p-1 rounded-full border-opacity-0 hover:border-opacity-100 cursor-pointer"
      >
        {existingProduct ? <MdFavorite /> : <MdFavoriteBorder />}
      </span>
    </div>
  );
};

export default ProductIcon;
