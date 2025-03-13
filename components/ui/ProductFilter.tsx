"use client";
import React, { useState } from "react";
import { Slider } from "./slider";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Label } from "./label";
import { X, ChevronDown, ChevronUp, Filter } from "lucide-react";

interface Props {
  categories: string[];
  setSelectedCategory: (category: string) => void;
  selectedCategory: string;
  setPriceFilter: (value: string) => void;
  priceFilter: string;
  setPriceValue: (value: number) => void;
  priceValue: number;
  defaultPrice: number;
  maxPrice: number;
}

const ProductFilter = ({
  categories,
  setSelectedCategory,
  selectedCategory,
  setPriceFilter,
  priceFilter,
  setPriceValue,
  priceValue,
  defaultPrice,
  maxPrice,
}: Props) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Initial categories to show (first 6)
  const initialCategories = categories.slice(0, 6);
  const remainingCategories = categories.slice(6);

  // Format category name for display
  const formatCategoryName = (category: string) => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Format price display
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Handle price range selection
  const handlePriceChange = (value: number) => {
    setPriceValue(value);
    setPriceFilter(`price_lte=${value}`);
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory("");
    setPriceValue(maxPrice);
    setPriceFilter("");
  };

  const filterContent = (
    <div className="space-y-8">
      {/* Categories Section */}
      <div>
        <h4 className="font-medium text-lg mb-4 pb-2 border-b">Categories</h4>
        <div className="space-y-0">
          {/* All Categories option */}
          <div
            className={`group flex items-center p-2.5 rounded-md cursor-pointer transition-colors ${
              !selectedCategory ? "bg-black text-white" : "hover:bg-gray-100"
            }`}
            onClick={() => setSelectedCategory("")}
          >
            <div className="flex-1 font-medium">All Categories</div>
            {!selectedCategory && (
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            )}
          </div>

          {/* Initial categories */}
          {initialCategories.map((category, index) => (
            <div
              key={index}
              className={`group flex items-center gap-3 p-2.5 rounded-md cursor-pointer transition-colors ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              <div className="flex-1 capitalize">
                {formatCategoryName(category)}
              </div>
              {selectedCategory === category && (
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              )}
            </div>
          ))}

          {/* Remaining categories (shown when expanded) */}
          {showAllCategories &&
            remainingCategories.map((category, index) => (
              <div
                key={index}
                className={`group flex items-center gap-3 p-2.5 rounded-md cursor-pointer transition-colors ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                <div className="flex-1 capitalize">
                  {formatCategoryName(category)}
                </div>
                {selectedCategory === category && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                )}
              </div>
            ))}

          {/* Show more/less button */}
          {categories.length > 6 && (
            <button
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="flex items-center gap-1.5 mt-3 text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              {showAllCategories ? (
                <>
                  <ChevronUp size={16} />
                  Show fewer categories
                </>
              ) : (
                <>
                  <ChevronDown size={16} />
                  Show all categories ({categories.length})
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium text-lg mb-4 pb-2 border-b">Price Range</h4>
        <div className="space-y-6 px-2">
          <Slider
            defaultValue={[maxPrice]}
            max={maxPrice}
            min={defaultPrice}
            step={50}
            value={[priceValue]}
            onValueChange={(values) => handlePriceChange(values[0])}
            className="mt-6"
          />
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {formatPrice(defaultPrice)}
            </span>
            <span className="text-sm font-medium text-blue-600">
              {formatPrice(priceValue)}
            </span>
            <span className="text-sm font-medium">{formatPrice(maxPrice)}</span>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {(selectedCategory || priceValue < maxPrice) && (
        <div className="pt-4">
          <h4 className="font-medium text-lg mb-4 pb-2 border-b">
            Active Filters
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedCategory && (
              <div className="bg-gray-100 rounded-full px-3 py-1.5 flex items-center gap-2 text-sm">
                <span>
                  Category:{" "}
                  <span className="font-medium">
                    {formatCategoryName(selectedCategory)}
                  </span>
                </span>
                <button
                  onClick={() => setSelectedCategory("")}
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {priceValue < maxPrice && (
              <div className="bg-gray-100 rounded-full px-3 py-1.5 flex items-center gap-2 text-sm">
                <span>
                  Max Price:{" "}
                  <span className="font-medium">{formatPrice(priceValue)}</span>
                </span>
                <button
                  onClick={() => setPriceValue(maxPrice)}
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            className="w-full mt-4 border-gray-300"
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile filter toggle */}
      <div className="md:hidden w-full mb-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-between"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <span className="flex items-center gap-2">
            <Filter size={18} />
            <span>Filters</span>
          </span>
          {(selectedCategory || priceValue < maxPrice) && (
            <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {(selectedCategory ? 1 : 0) + (priceValue < maxPrice ? 1 : 0)}
            </span>
          )}
        </Button>
      </div>

      {/* Mobile filters (slide from left) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 md:hidden ${
          showMobileFilters ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setShowMobileFilters(false)}
      >
        <div
          className={`fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl overflow-y-auto transition-transform duration-300 ${
            showMobileFilters ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile header */}
          <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
            <h2 className="text-lg font-bold">Filters</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMobileFilters(false)}
              className="rounded-full h-8 w-8"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile filters content */}
          <div className="p-4">{filterContent}</div>

          {/* Mobile footer */}
          <div className="border-t p-4 sticky bottom-0 bg-white">
            <Button
              className="w-full"
              onClick={() => setShowMobileFilters(false)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop filters */}
      <div className="hidden md:block w-64 bg-white p-5 rounded-lg shadow-sm border">
        {filterContent}
      </div>
    </>
  );
};

export default ProductFilter;
