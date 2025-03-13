"use client";
import { store } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Product } from "@/type";
import React from "react";
import toast from "react-hot-toast";
import { Plus, Minus, Trash } from "lucide-react";

interface Props {
  product: Product;
  className?: string;
  showSubtotal?: boolean;
}

const AddToCartBtn = ({ product, className, showSubtotal = true }: Props) => {
  const { cartProduct, addToCart, decreaseQuantity, removeFromCart } = store();

  const cartItem = cartProduct.find((item) => item.id === product?.id);
  const isInCart = Boolean(cartItem);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      if (!isInCart) {
        toast.success(`${product?.title} added to cart!`);
      }
    }
  };

  const handleDecreaseQuantity = () => {
    if (product && quantity > 1) {
      decreaseQuantity(product.id);
    } else if (product && quantity === 1) {
      handleRemoveFromCart();
    }
  };

  const handleRemoveFromCart = () => {
    if (product) {
      removeFromCart(product.id);
      toast.success(`${product?.title} removed from cart!`);
    }
  };

  // Calculate subtotal if needed
  const subtotal =
    isInCart && showSubtotal ? (product.price * quantity).toFixed(2) : null;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {isInCart ? (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={handleDecreaseQuantity}
                className="p-2 hover:bg-gray-100 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>

              <span className="px-3 py-1 text-sm font-medium">{quantity}</span>

              <button
                onClick={handleAddToCart}
                className="p-2 hover:bg-gray-100 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={handleRemoveFromCart}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
              aria-label="Remove from cart"
            >
              <Trash size={18} />
            </button>
          </div>

          {showSubtotal && (
            <div className="text-sm font-medium text-gray-900">
              Subtotal: ${subtotal}
            </div>
          )}
        </>
      ) : (
        <button
          onClick={handleAddToCart}
          className={cn(
            "text-sm tracking-wide font-medium rounded-xl border-[1px] py-2 w-full border-black hover:bg-black hover:text-white px-4 transition-colors"
          )}
        >
          Add To Cart
        </button>
      )}
    </div>
  );
};

export default AddToCartBtn;
