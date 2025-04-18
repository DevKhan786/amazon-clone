"use client";
import { store } from "@/lib/store";
import { Product } from "@/type";
import React from "react";
import CartProduct from "./CartProduct";
import CartSummary from "./CartSummary";
import { useRouter } from "next/navigation";

const CartProducts = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const { cartProduct } = store();
  const router = useRouter();
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-12">
      {!isAuthenticated && (
        <div className="bg-yellow-100 p-4 rounded-md mb-8">
          <p className="text-yellow-800">
            Please{" "}
            <a href="/login" className="text-blue-600 underline">
              log in
            </a>{" "}
            to proceed to checkout.
          </p>
        </div>
      )}
      {cartProduct?.length > 0 ? (
        <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 px-2">
            <section className="lg:col-span-7 space-y-4">
              {cartProduct?.map((product: Product) => (
                <CartProduct key={product?.id} product={product} />
              ))}
            </section>

            <CartSummary isAuthenticated={isAuthenticated} />
          </div>
        </>
      ) : (
        <div className="text-center py-20 space-y-14">
          <h2 className="text-2xl font-semibold text-gray-900">
            Your cart is empty
          </h2>
          <p className="text-gray-600">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-10 bg-black px-6 py-3 bg-primary text-white rounded-md hover:opacity-80 transition-opacity"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default CartProducts;
