"use client";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { CategoryItems, Product } from "@/type";
import CategoryListView from "./CategoryListView";

const SearchInput = ({ categories }: CategoryItems) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://dummyjson.com/products?limit=100"
        );
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products when search query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter((item: Product) =>
      item?.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  // Effect to detect click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsInputFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <div
      ref={searchContainerRef}
      className="flex-1 h-10 mx-4 hidden md:inline-flex items-center justify-between relative"
    >
      <CategoryListView categories={categories} />
      <input
        className="w-full h-full rounded-tr-md rounded-br-md px-2 placeholder:text-sm text-base text-black placeholder:text-black/70 border-[3px] border-transparent outline-none focus-visible:border-amazonOrange"
        type="text"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        placeholder="Search amazon"
        onFocus={() => setIsInputFocused(true)}
      />
      {searchQuery && (
        <MdOutlineClose
          onClick={() => setSearchQuery("")}
          className="text-xl text-amazonLight hover:text-red-600 absolute right-14 duration-200 cursor-pointer"
        />
      )}
      <span
        onClick={handleSearch}
        className="w-12 h-full bg-amazonOrange hover:bg-amazonOrangeDark duration-200 cursor-pointer text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md rounded-br-md"
      >
        <HiOutlineSearch />
      </span>

      {/* Search results dropdown */}
      {isInputFocused && searchQuery && (
        <div className="absolute left-0 top-12 w-full mx-auto h-auto max-h-96 bg-white rounded-md overflow-y-scroll cursor-pointer text-black shadow-md z-50">
          {loading ? (
            <div className="py-4 px-5 text-center">
              <p>Loading...</p>
            </div>
          ) : filteredProducts?.length > 0 ? (
            <div className="flex flex-col">
              {filteredProducts?.map((item: Product) => (
                <Link
                  key={item?.id}
                  href={`/product/${item?.id}`}
                  onClick={() => {
                    setSearchQuery("");
                    setIsInputFocused(false);
                  }}
                  className="flex items-center gap-x-2 text-base font-medium hover:bg-lightText/30 px-3 py-1.5"
                >
                  <CiSearch className="text-lg" /> {item?.title}
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-10 px-5">
              <p className="text-base">
                Nothing matched with{" "}
                <span className="font-semibold underline underline-offset-2 decoration-[1px]">
                  {searchQuery}
                </span>{" "}
                please try again.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
