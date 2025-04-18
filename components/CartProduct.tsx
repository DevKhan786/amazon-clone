"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/type";
import { store } from "@/lib/store";
import { Trash2, Plus, Minus } from "lucide-react";

interface CartProductProps {
  product: Product;
}

const CartProduct: React.FC<CartProductProps> = ({ product }) => {
  const { removeFromCart, decreaseQuantity, addToCart } = store();

  return (
    <div className="flex py-6 border-b border-gray-200 w-full">
      {/* Product Image */}
      <div className="flex-shrink-0 w-12 h-12 sm:w-24 sm:h-24 border border-gray-200 rounded-md overflow-hidden mr-4">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.images[0]}
            alt={product.title}
            width={96}
            height={96}
            className="w-full h-full object-contain"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between">
            <h3 className="text-xs sm:text-sm font-medium text-gray-900">
              <Link href={`/product/${product.id}`}>{product.title}</Link>
            </h3>
            <p className="ml-4 text-xs sm:text-sm font-semibold text-gray-900">
              ${(product.price * (product.quantity || 1)).toFixed(2)}
            </p>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            {product.category}
          </p>
        </div>

        {/* Quantity Control */}
        <div className="flex items-center mt-2">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => decreaseQuantity(product.id)}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <Minus className="h-4 w-4 text-gray-600" />
            </button>
            <span className="px-3 text-xs sm:text-sm text-gray-900">
              {product.quantity || 1}
            </span>
            <button
              onClick={() => addToCart(product)}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <Plus className="h-4 w-4 text-gray-600" />
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeFromCart(product.id)}
            className="ml-4 text-xs sm:text-sm text-red-600 hover:text-red-800 flex items-center"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
