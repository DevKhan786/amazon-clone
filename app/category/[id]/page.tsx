import CategoryProducts from "@/components/CategoryProducts";
import Container from "@/components/Container";
import { fetchData } from "@/hooks/fetchData";
import React from "react";

const CategoyPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const endpoint = "https://dummyjson.com/products/category-list";
  const categories = await fetchData(endpoint);
  const { id } = await params;
  console.log();
  return (
    <Container className="py-10">
      <CategoryProducts categories={categories} id={id} />
    </Container>
  );
};

export default CategoyPage;
