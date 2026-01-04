import React, { useRef, useEffect } from 'react';
import styles from '../styles/CartSidebar.module.css';
import { useCart } from '../context/CartContext';

const CartSidebar = ({ isOpen, onClose }) => {
    const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
    const sidebarRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            // Disable body scroll when cart is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={styles.backdrop}>
            <div className={styles.sidebar} ref={sidebarRef}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Your Cart</h2>
                    <button onClick={onClose} className={styles.closeButton}>×</button>
                </div>

                <div className={styles.items}>
                    {cartItems.length === 0 ? (
                        <div className={styles.emptyCart}>Your cart is empty.</div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className={styles.item}>
                                <img src={item.thumbnail} alt={item.title} className={styles.itemImage} />
                                <div className={styles.itemDetails}>
                                    <div className={styles.itemName}>{item.title}</div>
                                    <div className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</div>
                                    <div className={styles.controls}>
                                        <button
                                            className={styles.qtyButton}
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            className={styles.qtyButton}
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            // Optional: Limit by stock if available
                                            disabled={item.quantity >= item.stock}
                                        >
                                            +
                                        </button>
                                        <button
                                            className={styles.removeButton}
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className={styles.footer}>
                        <div className={styles.total}>
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <button className={styles.checkoutButton}>Checkout</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartSidebar;
