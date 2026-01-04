import React from 'react';
import ProductCard from './ProductCard';
import styles from '../styles/ProductList.module.css';

const ProductList = ({ products }) => {
    if (products.length === 0) {
        return <div className={styles.empty}>No products found.</div>;
    }

    return (
        <div className={styles.grid}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
