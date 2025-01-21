import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getCategoryWisePoster } from "../../../services/operations/posterDetailsAPI";

const CategoryWisePosterPage = () => {
  const { id: categoryId } = useParams(); // Get the category ID from the URL
  const [categoryData, setCategoryData] = useState(null); // State to hold category and poster data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch data for the selected category
  const fetchCategoryWisePoster = async (categoryId) => {
    try {
      const response = await getCategoryWisePoster(categoryId);
      setCategoryData(response.selectedCategory); // Save the category data
      setLoading(false);
    } catch (err) {
      console.error("Error fetching category data:", err);
      setError("Failed to load category data. Please try again later.");
      setLoading(false);
    }
  };

  // Trigger data fetch on component mount
  useEffect(() => {
    if (categoryId) {
      fetchCategoryWisePoster(categoryId);
    }
  }, [categoryId]);

  // Render the component
  if (loading) return <div>Loading posters...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!categoryData || !categoryData.poster.length)
    return <div>No posters found in this category.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        {categoryData.name}
      </h1>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        {categoryData.description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categoryData.poster.map((poster) => (
          <div
            key={poster._id}
            className="rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800"
          >
            <img
              src={poster.image} // Poster image URL
              alt={poster.posterName} // Poster name
              className="object-cover h-48 w-full"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {poster.posterName}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {poster.description}
              </p>
              <p className="text-gray-800 dark:text-gray-200 font-bold">
                Price: ₹{poster.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryWisePosterPage;
