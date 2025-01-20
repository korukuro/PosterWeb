import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../services/operations/posterDetailsAPI';
import { FocusCards } from "../components/ui/Focus-card";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [cards, setCards] = useState([]);

    // Image map for categories
    const imageMap = {
        "Cars": require('../additionalFile/category-image/Cars.jpeg'),
        "Anime": require('../additionalFile/category-image/Anime.jpeg'),
        "Comics": require('../additionalFile/category-image/Comic.jpeg'),
        "Game": require('../additionalFile/category-image/Game.jpeg'),
        "Movie": require('../additionalFile/category-image/Movie.jpeg'),
        "Music": require('../additionalFile/category-image/Music.jpeg'),
        "Quotes": require('../additionalFile/category-image/Quotes.jpeg'),
        "Scenery": require('../additionalFile/category-image/Scenery.jpeg'),
        "Series": require('../additionalFile/category-image/Series.jpeg'),
        "Sports": require('../additionalFile/category-image/Sports.jpeg'),
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getAllCategories();
                setCategories(res.data);

                // Generate cards with dynamic images
                const generatedCards = res.data.map((category) => ({
                    title: category.name,
                    src: imageMap[category.name], 
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
