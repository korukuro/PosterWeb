import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../services/operations/posterDetailsAPI';
import CategoryCard from '../components/core/Categories/CategoryCard';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getAllCategories(); 
                setCategories(res.data); 
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div>
            <h1>Categories</h1>
            {categories.length > 0 ? (
                <ul>
                    {categories.map((category) => (
                        <CategoryCard key={category._id} category={category} />
                    ))}
                </ul>
            ) : (
                <p>No categories found.</p>
            )}
        </div>
    );
};

export default Categories;
