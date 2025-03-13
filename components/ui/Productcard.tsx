import { cn } from "@/lib/utils";
import { Product } from "@/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProductIcon from "../ProductIcon";
import AddToCartBtn from "./AddToCartBtn";

const Productcard = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "group relative bg-white rounded-lg border border-gray-200 hover:border-gray-300",
        "transition-all duration-300 hover:shadow-xl overflow-hidden",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden border border-black">
        <Link href={`/product/${product.id}`} className="block h-full w-full">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-contain bg-gray-50 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={85}
            loading="lazy"
          />
        </Link>

        {/* Product Icons */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ProductIcon product={product} />
        </div>
      </div>

      {/* Product Info */}

      <div className="p-4 border border-black space-y-3">
        {/* Category Badge */}
        <span className="inline-block px-2 py-1 text-xs font-medium  bg-gray-600 text-white rounded-full">
          {product.category}
        </span>

        {/* Title and Description */}
        <div className="space-y-1">
          <h3 className="font-medium text-gray-900 line-clamp-1 hover:text-primary transition-colors">
            <Link href={`/product/${product.id}`}>{product.title}</Link>
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price and Cart Button */}
        <div className="flex items-center justify-between mt-2">
          <div className="space-y-0.5">
            <p className="text-lg font-semibold text-gray-900">
              ${product.price}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-sm text-gray-400 line-through">
                $
                {(
                  product.price /
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </p>
            )}
          </div>
          <AddToCartBtn product={product} />
        </div>
      </div>
    </div>
  );
};

export default Productcard;
