import Container from "@/components/Container";
import React from "react";
import SingleProduct from "@/components/SingleProduct";

const SingleProductID = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  if (!id) {
    return (
      <Container>
        <p>No product ID provided</p>
      </Container>
    );
  }
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch product data");
    }
    const product = await res.json();
    return (
      <Container className="py-10">
        <SingleProduct product={product} />
      </Container>
    );
  } catch (error) {
    console.error("Error fetching product", error);
    return (
      <Container>
        <p className="text-center text-red-500">Failed to load the product</p>
      </Container>
    );
  }
  return <div></div>;
};

export default SingleProductID;
