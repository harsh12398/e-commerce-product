import { useState, useEffect } from 'react';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch products
                const productsRes = await fetch('https://dummyjson.com/products');
                const productsData = await productsRes.json();
                setProducts(productsData.products);

                // Fetch categories
                const categoriesRes = await fetch('https://dummyjson.com/products/categories');
                const categoriesData = await categoriesRes.json();
                // API might return array of objects or strings, handle accordingly
                // DummyJSON currently returns array of objects { slug, name, url }
                setCategories(categoriesData);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { products, categories, loading, error };
};
