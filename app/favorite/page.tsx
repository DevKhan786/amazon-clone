import FavoriteProducts from "@/components/FavoriteProducts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorites | Amazon Online Shopping",
};

const FavoritePage = () => {
  return <FavoriteProducts />;
};

export default FavoritePage;
