import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../services/operations/posterDetailsAPI';
import { FocusCards } from "../components/ui/Focus-card";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
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
        };
        fetchCategories();
    }, []);
    return (
        <div className='mt-16 p-6'>
            <FocusCards cards={cards} />
            
        </div>
    );
};

export default Categories;
