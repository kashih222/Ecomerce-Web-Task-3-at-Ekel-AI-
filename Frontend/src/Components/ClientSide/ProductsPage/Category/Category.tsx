import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_CATEGORY } from "../../../../GraphqlOprations/queries";

interface CategoryProps {
  onCategorySelect: (category: string) => void;
}

const Category = ({ onCategorySelect }: CategoryProps) => {
  const [categories, setCategories] = useState<string[]>(() => ["All"]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Fetch categories using Apollo
  const { data, loading, error } = useQuery(GET_PRODUCTS_CATEGORY);

  useEffect(() => {
    if (data?.productCategories) {
      setTimeout(() => {
        setCategories(["All", ...data.productCategories]);
      }, 0);
    }
    if (error) console.error("GraphQL error fetching categories:", error);
  }, [data, error]);

  if (loading) {
    return (
      <div className="w-full text-center py-6">
        <h2 className="text-xl font-semibold">Loading categories...</h2>
      </div>
    );
  }

  return (
    <div className="w-full text-black flex items-center justify-center">
      <div className="container">
        <div className="py-6 text-center">
          <h1 className="text-2xl md:text-4xl font-bold tracking-widest">
            Categories
          </h1>
        </div>

        <div className="overflow-x-auto py-4">
          <ul className="flex flex-wrap gap-4 px-4 md:px-8">
            {categories.map((category, index) => (
              <li
                key={index}
                onClick={() => {
                  setSelectedCategory(category);
                  onCategorySelect(category);
                }}
                className={`px-4 py-2 rounded-full cursor-pointer transition
      ${
        selectedCategory === category
          ? "bg-black text-white scale-95"
          : "bg-gray-200 text-black hover:scale-90"
      }`}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Category;
