// app/products/page.tsx
import React from "react";
import AllProducts from "@/components/AllProducts";
import { fetchData } from "@/hooks/fetchData";

// This is a server component to fetch initial categories
async function ProductsPage() {
  try {
    // Fetch categories with the correct URL
    const categoriesData = await fetchData(
      "https://dummyjson.com/products/category-list"
    );

    // Ensure we have an array of strings
    const processedCategories = Array.isArray(categoriesData)
      ? categoriesData.map((category) => String(category))
      : [];

    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <AllProducts categories={processedCategories} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return (
      <div className="min-h-screen bg-gray-50 py-10 flex items-center justify-center">
        <p>Error loading products. Please try again later.</p>
      </div>
    );
  }
}

export default ProductsPage;
