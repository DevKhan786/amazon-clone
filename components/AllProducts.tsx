"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Container from "./Container";
import Title from "./ui/Title";
import { Card, CardContent } from "./ui/card";
import ProductFilter from "./ui/ProductFilter";
import Productcard from "./ui/Productcard";
import { Product } from "@/type";
import { fetchData } from "@/hooks/fetchData";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const AllProducts = ({ categories }: { categories: string[] }) => {
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [priceValue, setPriceValue] = useState(200);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const maxPrice = 200;
  const defaultPrice = 0;
  const productsPerPage = 12;

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      setProducts([]);
      setPage(0);
      setHasMore(true);
    }
  }, [selectedCategory, priceFilter, isClient]);

  // Fetch products based on filters and pagination
  const fetchProducts = useCallback(
    async (pageToLoad = 0) => {
      if (pageToLoad === 0) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      try {
        // Calculate skip value for pagination
        const skip = pageToLoad * productsPerPage;

        // Build endpoint based on category
        let endpoint = selectedCategory
          ? `https://dummyjson.com/products/category/${selectedCategory}?limit=${productsPerPage}&skip=${skip}`
          : `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`;

        const data = await fetchData(endpoint);
        const fetchedProducts = data.products || [];

        // Filter by price on client side
        const filteredProducts =
          priceValue < maxPrice
            ? fetchedProducts.filter((p: Product) => p.price <= priceValue)
            : fetchedProducts;

        // Update products state
        setProducts((prev) =>
          pageToLoad === 0 ? filteredProducts : [...prev, ...filteredProducts]
        );

        // Check if we have more products to load
        const totalCount = data.total || 0;
        setHasMore(skip + filteredProducts.length < totalCount);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [selectedCategory, priceValue, priceFilter, productsPerPage]
  );

  // Initial fetch
  useEffect(() => {
    if (isClient) {
      fetchProducts(0);
    }
  }, [isClient, fetchProducts]);

  // Setup intersection observer for infinite scrolling
  useEffect(() => {
    if (!isClient) return;

    // Disconnect previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !loading && !loadingMore) {
          setPage((prevPage) => prevPage + 1);
          fetchProducts(page + 1);
        }
      },
      { threshold: 0.1 }
    );

    // Observe the load more element
    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isClient, hasMore, loading, loadingMore, page, fetchProducts]);

  return (
    <Container className="py-10">
      <Title className="text-4xl font-bold text-center mb-5">
        Discover our collection
      </Title>

      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters */}
            <div className="w-full md:w-auto flex-shrink-0">
              <ProductFilter
                categories={categories}
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
                priceFilter={priceFilter}
                setPriceFilter={setPriceFilter}
                priceValue={priceValue}
                setPriceValue={setPriceValue}
                defaultPrice={defaultPrice}
                maxPrice={maxPrice}
              />
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results Summary */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">
                  {!isClient || loading
                    ? "Loading products..."
                    : `${products.length} ${
                        products.length === 1 ? "Product" : "Products"
                      } found`}
                </h2>
                <div className="text-sm text-gray-500">
                  {selectedCategory
                    ? `Category: ${selectedCategory}`
                    : "All categories"}
                </div>
              </div>

              {/* Product Grid */}
              {!isClient || loading ? (
                <div className="flex justify-center items-center h-96">
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                    <p className="mt-4 text-gray-500">Loading products...</p>
                  </div>
                </div>
              ) : products.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-96 text-center">
                  <div className="p-6 bg-gray-100 rounded-full mb-4">
                    <svg
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20 12H4M8 16l-4-4 4-4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 max-w-md mb-6">
                    Try adjusting your filters or browse a different category.
                  </p>
                  <Button
                    onClick={() => {
                      setSelectedCategory("");
                      setPriceValue(maxPrice);
                      setPriceFilter("");
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <Productcard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* Load more indicator */}
                  <div
                    ref={loadMoreRef}
                    className="w-full h-16 flex items-center justify-center mt-8"
                  >
                    {loadingMore && (
                      <div className="flex items-center">
                        <Loader2 className="h-6 w-6 animate-spin text-gray-400 mr-2" />
                        <span className="text-gray-500">
                          Loading more products...
                        </span>
                      </div>
                    )}

                    {!hasMore && products.length > 0 && (
                      <p className="text-gray-500">
                        You've reached the end of the results
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AllProducts;
