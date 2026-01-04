import React from 'react';
import styles from '../styles/Header.module.css';
import { useCart } from '../context/CartContext';

const Header = ({ onOpenCart }) => {
    const { totalItems } = useCart();

    return (
        <header className={styles.header}>
            <a href="/" className={styles.logo}>MiniStore</a>
            <button className={styles.cartButton} onClick={onOpenCart} aria-label="Open Cart">
                🛒
                {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
            </button>
        </header>
    );
};

export default Header;
