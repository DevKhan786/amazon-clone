import {
  bannerFive,
  bannerFour,
  bannerOne,
  bannerThree,
  bannerTwo,
} from "@/assets";
import ProductsList from "@/components/ProductsList";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { fetchData } from "@/hooks/fetchData";
import Image from "next/image";

const bannerImages = [
  { title: "bannerOne", source: bannerOne },
  { title: "bannerTwo", source: bannerTwo },
  { title: "bannerThree", source: bannerThree },
  { title: "bannerFour", source: bannerFour },
  { title: "bannerFive", source: bannerFive },
];

const endpoint = "https://dummyjson.com/products";
const { products } = await fetchData(endpoint);

export default async function Home() {
  return (
    <div className="space-y-10">
      {/* Improved Carousel */}
      <div className="relative group">
        <Carousel
          className="border border-black"
          opts={{
            loop: true,
          }}
        >
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {bannerImages.map((_, index) => (
              <div
                key={index}
                className="w-3 h-3 rounded-full bg-black/50 cursor-pointer"
              />
            ))}
          </div>
          <CarouselContent>
            {bannerImages?.map((item) => (
              <CarouselItem key={item?.title}>
                <Image
                  src={item?.source}
                  alt="Banner image"
                  className="w-full object-cover mt-10"
                  height={1080}
                  priority
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 left-16 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <CarouselPrevious className="h-12 w-12 rounded-none bg-black/20 hover:bg-black/30 text-white" />
          </div>
          <div className="absolute inset-y-0 right-16 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <CarouselNext className="h-12 w-12 rounded-none bg-black/20 hover:bg-black/30 text-white" />
          </div>
        </Carousel>
      </div>
      <div className="p-5 -mt-10 md:-mt-20 lg:-mt-60">
        <ProductsList products={products} />
      </div>
    </div>
  );
}
