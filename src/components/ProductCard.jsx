import React from 'react';
import styles from '../styles/ProductCard.module.css';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const isOutOfStock = product.stock === 0 || product.availabilityStatus === 'Out of Stock'; // DummyJSON sometimes uses low stock numbers or status string

    // DummyJSON specific stock check
    const hasStock = product.stock > 0;

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={product.thumbnail} alt={product.title} className={styles.image} loading="lazy" />
            </div>
            <div className={styles.content}>
                <span className={styles.category}>{product.category}</span>
                <h3 className={styles.title} title={product.title}>{product.title}</h3>

                <div className={styles.stock}>
                    {hasStock ? (
                        <span className={styles.inStock}>In Stock ({product.stock})</span>
                    ) : (
                        <span className={styles.outOfStock}>Out of Stock</span>
                    )}
                </div>

                <div className={styles.price}>${product.price}</div>

                <button
                    className={styles.button}
                    disabled={!hasStock}
                    onClick={() => addToCart(product)}
                >
                    {hasStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
