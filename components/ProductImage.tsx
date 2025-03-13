"use client";
import { Product } from "@/type";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";

const ProductImage = ({ product }: { product: Product }) => {
  const [imgUrl, setImgUrl] = useState(product?.images[0]);
  return (
    <div className="flex items-start">
      <div>
        {product?.images?.map((item) => (
          <button
            key={item}
            className={`relative w-24 h-24 mb-1 border cursor-pointer transition-all
      ${
        imgUrl === item
          ? "border-2 border-black opacity-100"
          : "border-gray-300 opacity-80 hover:opacity-100"
      }`}
            onClick={() => setImgUrl(item)}
            aria-label={`View product image ${item}`}
          >
            <Image
              src={item}
              fill
              alt="Product thumbnail"
              className="object-contain p-1"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              sizes="6rem"
            />
          </button>
        ))}
      </div>
      <motion.div
        key={imgUrl}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-gray-100 rounded-md ml-5 w-full max-h-[550px]"
      >
        {imgUrl && (
          <Image
            src={imgUrl}
            width={500}
            height={500}
            alt="mainImage"
            className="w-full h-full object-contain"
          />
        )}
      </motion.div>
    </div>
  );
};

export default ProductImage;
