"use client";
import Link from "next/link";
import { store } from "@/lib/store";
import { useRouter } from "next/navigation";

const CartSummary = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const { cartProduct, resetCart } = store();
  const router = useRouter();

  // Calculate totals
  const subtotal = cartProduct.reduce(
    (total, product) => total + product.price * (product.quantity || 1),
    0
  );

  const totalItems = cartProduct.reduce(
    (total, product) => total + (product.quantity || 1),
    0
  );

  // Shipping calculation (free over $50, $5 otherwise)
  const shippingCost = subtotal >= 50 ? 0 : 5;

  // Total including shipping
  const total = subtotal + shippingCost;

  const handleCheckout = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      router.push("/login");
    }
  };

  return (
    <section className="bg-gray-50 rounded-lg p-6 space-y-4 lg:col-span-5">
      <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal ({totalItems} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          <span>
            {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between font-semibold text-gray-900 border-t pt-2 mt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <Link
        href={isAuthenticated ? "/checkout" : "/login"}
        onClick={handleCheckout}
        className={`w-full block text-center text-black py-3 rounded-md hover:opacity-80 transition-opacity ${
          isAuthenticated ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {isAuthenticated ? "Proceed to Checkout" : "Please login to proceed"}
      </Link>
      <button
        onClick={resetCart}
        className="w-full block text-center  text-black py-3 rounded-md hover:opacity-80 transition-opacity bg-red-500"
      >
        Clear Cart
      </button>

      {subtotal < 50 && (
        <p className="text-sm text-gray-500 text-center">
          Add ${(50 - subtotal).toFixed(2)} more to get free shipping!
        </p>
      )}
    </section>
  );
};

export default CartSummary;
