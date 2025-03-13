"use client";
import React, { useEffect, useState } from "react";
import Title from "./ui/Title";
import { fetchData } from "@/hooks/fetchData";
import { Button } from "./ui/button";
import Productcard from "./ui/Productcard";
import { Product } from "@/type";

interface Props {
  categories: string[];
  id: string;
}

const CategoryProducts = ({ categories, id }: Props) => {
  const [currentCategory, setCurrentCategory] = useState(id);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  // Add a state to track if we're on the client
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true once component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const getData = async () => {
      const endpoint = `https://dummyjson.com/products/category/${currentCategory}`;
      setLoading(true);
      try {
        const data = await fetchData(endpoint);
        setProducts(data.products);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        console.log(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (isClient) {
      getData();
    }
  }, [currentCategory, isClient]); // Add isClient to dependencies

  // Update currentCategory when id prop changes
  useEffect(() => {
    if (isClient) {
      setCurrentCategory(id);
    }
  }, [id, isClient]);

  const handleCategoryClick = (category: string) => {
    setCurrentCategory(category);
  };

  return (
    <div suppressHydrationWarning>
      <Title className="text-xl">
        Products by Category{" "}
        <span className="font-bold text-green-600 capitalize tracking-wide">
          {currentCategory}
        </span>
      </Title>
      <div className="py-5 flex flex-col md:flex-row items-start gap-5">
        <div className="flex flex-row md:flex-col gap-2 p-2 bg-gray-200/80 border border-black rounded-xl overflow-x-auto md:overflow-visible w-full md:w-auto">
          {categories?.map((category) => (
            <Button
              className={`bg-white border border-black rounded-lg hover:text-white hover:bg-black shadow-none capitalize text-black font-semibold transition-all duration-300 whitespace-nowrap
              ${currentCategory === category ? "bg-black text-white" : ""}`}
              key={category}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="flex-1 w-full">
          {!isClient || loading ? (
            <div className="text-center py-10">Loading products...</div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <Productcard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              No products found in this category
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
