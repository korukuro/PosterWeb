import { useParams, Link } from "react-router-dom"; // Import Link
import React, { useEffect, useState } from "react";
import { getCategoryWisePoster } from "../../../services/operations/posterDetailsAPI";
import Spinner from "../../Spinner";
import Product from "../../Product";
import HomeSkeleton from "../../common/skeleton/HomeSkeleton";
const CategoryWisePosterPage = () => {
  const { id: categoryId } = useParams(); // Get the category ID from the URL
  const [categoryData, setCategoryData] = useState(null); // State to hold category and poster data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch data for the selected category
  const fetchCategoryWisePoster = async (categoryId) => {
    try {
      const response = await getCategoryWisePoster(categoryId);
      const shuffledPosters = response.selectedCategory.poster.sort(
        () => Math.random() - 0.5
      );
      setCategoryData({
        ...response.selectedCategory,
        poster: shuffledPosters,
      }); // Save the category data
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
  if (loading)
    return (
      <div className="flex justify-center items-center mt-20 mb-5">
        <HomeSkeleton/>
      </div>
    );
  if (error) return <div className="text-red-500">{error}</div>;
  if (!categoryData || !categoryData.poster.length)
    return <div>No posters found in this category.</div>;

  return (
    <div className="container mx-auto pt-20 pb-24">
      
      <div className="flex justify-center mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categoryData.poster && categoryData.poster.length > 0 ? (
            categoryData.poster.map((poster) => <Product post={poster} />)
          ) : (
            <div>No posters found in this category.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryWisePosterPage;
