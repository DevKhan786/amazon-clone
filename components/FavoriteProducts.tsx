"use client";
import { store } from "@/lib/store";
import { Product } from "@/type";
import React from "react";
import Productcard from "../components/ui/Productcard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";

const FavoriteProducts = () => {
  const { favoriteProduct } = store();
  const router = useRouter();

  return (
    <Container>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {favoriteProduct?.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">
                Your Favorites
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteProduct?.map((product: Product) => (
                <Productcard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20 space-y-14">
            <h2 className="text-2xl font-semibold text-gray-900">
              Your favorites are empty
            </h2>
            <p className="text-gray-600">
              Looks like you haven&apos;t added any items to your favorites yet.
            </p>
            <Button
              onClick={() => router.push("/")}
              className="mt-10 bg-primary text-white rounded-md hover:opacity-80 transition-opacity"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default FavoriteProducts;
