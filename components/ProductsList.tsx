import { Product } from "@/type";
import React from "react";
import Productcard from "./ui/Productcard";
import Container from "./Container";
import { cn } from "@/lib/utils";

interface Props {
  products: Product[];
  className?: string;
}

const ProductsList = ({ products }: Props) => {
  return (
    <Container
      className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10")}
    >
      {products?.map((product, index) => (
        <Productcard key={index} product={product} />
      ))}
    </Container>
  );
};

export default ProductsList;
