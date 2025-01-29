import React, { useEffect, useState } from "react";
import { getAllCategories } from "../services/operations/posterDetailsAPI";
import { FocusCards } from "../components/ui/Focus-card";
import Spinner from "../components/Spinner";
import { motion } from "framer-motion";
import { AuroraBackground } from "../components/ui/background";
import CategoriesSkeleton from "../components/common/skeleton/CategoriesSkeleton";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await getAllCategories();
        if (res?.data?.length > 0) {
          setCategories(res.data);

          const generatedCards = res.data.map((category) => ({
            title: category.name,
            categoryId: category._id,
          }));
          setCards(generatedCards);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(true);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  return (
    <AuroraBackground>
      {/* Page Title Animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 pt-24"
      >
        <div className="text-3xl md:text-8xl font-bold dark:text-white text-center pb-10 tracking-widest">
          Collections
        </div>
      </motion.div>

      {/* Categories Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 1,
          ease: "easeInOut",
        }}
        className="pt-4 p-6"
      >
        {loading ? (
          <CategoriesSkeleton skeletonCount={6} />
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-red-500 font-semibold"
          >
            Failed to load categories. Please try again later.
          </motion.div>
        ) : categories.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <FocusCards cards={cards} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-gray-500 font-medium"
          >
            No categories available.
          </motion.div>
        )}
      </motion.div>
    </AuroraBackground>
  );
};

export default Categories;
