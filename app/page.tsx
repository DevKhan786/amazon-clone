import ProductsList from "@/components/ProductsList";
import { fetchData } from "@/hooks/fetchData";

const endpoint = "https://dummyjson.com/products";
const { products } = await fetchData(endpoint);

export default async function Home() {
  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-center mt-10">Products for you:</h1>
      <div className="p-5 ">
        <ProductsList products={products} />
      </div>
    </div>
  );
}
