import React, { useEffect, useState } from "react";
import { getAllCategories } from "../services/operations/posterDetailsAPI";
import { FocusCards } from "../components/ui/Focus-card";
import Spinner from "../components/Spinner";

import { motion } from "framer-motion";
import { AuroraBackground } from "../components/ui/background";
import { set } from 'mongoose';
import CategoriesSkeleton from '../components/common/skeleton/CategoriesSkeleton';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await getAllCategories();
        setCategories(res.data);

        const generatedCards = res.data.map((category) => ({
          title: category.name,
          categoryId: category._id,
        }));
        setCards(generatedCards);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative -z-20 flex flex-col gap-4 items-center justify-center px-4"
      ></motion.div>
      <div className="pt-24 p-6">
      <div className="text-3xl md:text-8xl font-bold dark:text-white text-center pb-10 tracking-widest">
          Collections
        </div>

        {loading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <FocusCards cards={cards} />
        )}
      </div>
    </AuroraBackground>
  );
};

export default Categories;
