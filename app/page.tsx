import ProductsList from "@/components/ProductsList";
import { fetchData } from "@/hooks/fetchData";

const endpoint = "https://dummyjson.com/products";
const { products } = await fetchData(endpoint);

export default async function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-lg mb-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center py-6 tracking-tight">
          For You
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <ProductsList products={products} />
      </div>
    </div>
  );
}
