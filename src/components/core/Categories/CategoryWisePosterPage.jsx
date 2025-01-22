import { useParams, Link } from "react-router-dom"; // Import Link
import React, { useEffect, useState } from "react";
import { getCategoryWisePoster } from "../../../services/operations/posterDetailsAPI";
import Spinner from "../../Spinner";
import Product from "../../Product";

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
  if (loading) return <div><Spinner/></div>;
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
          <Product post={poster}/>
        ))}
      </div>
    </div>
  );
};

export default CategoryWisePosterPage;
