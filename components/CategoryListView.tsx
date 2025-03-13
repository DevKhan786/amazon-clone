import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
} from "./ui/command";
import { CategoryItems } from "@/type";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CategoryListView = ({ categories }: CategoryItems) => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-auto justify-between rounded-none rounded-tl-md rounded-bl-md text-black/80 capitalize border-r-2 hover:border-amazonOrangeDark hoverEffect`}
        >
          {selectedCategory}
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Command className="bg-amazonBlue backdrop-blur-md text-white">
          <CommandInput placeholder="Search Category" className="h-9" />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup className="text-white">
              <CommandItem
                key="all"
                onSelect={() => {
                  setSelectedCategory("All");
                  setOpen(false);
                }}
                className="cursor-pointer hover:bg-amazonOrangeDark"
              >
                <Link href="/" className="w-full block py-1">
                  All Products
                </Link>
              </CommandItem>

              {categories?.map((category: string) => (
                <CommandItem
                  key={category}
                  onSelect={() => {
                    setSelectedCategory(category);
                    setOpen(false);
                  }}
                  className="cursor-pointer hover:bg-amazonOrangeDark"
                >
                  <Link
                    href={`/category/${category}`}
                    className="w-full flex py-1"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedCategory === category
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryListView;
