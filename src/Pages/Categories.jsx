import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../services/operations/posterDetailsAPI';
import CategoryCard from '../components/core/Categories/CategoryCard';
import { FocusCards } from "../components/ui/Focus-card";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getAllCategories();
                setCategories(res.data);

                // Dynamically create cards based on categories
                const generatedCards = res.data.map((category) => ({
                    title: category.name,
                    src: "https://via.placeholder.com/300", // Replace with actual image URLs if available
                }));
                setCards(generatedCards);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className='mt-16'>
            
            <FocusCards cards={cards} />
            
        </div>
    );
};

export default Categories;
