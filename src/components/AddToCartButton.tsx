import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import cart from '../services/cart';
import './AddToCartButton.scss';    

const AddToCartButton: React.FC<{ productId: string, onAdd: () => void }> = ({ productId, onAdd }) => {
    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await cart.addProductToCart(productId, 1, 'S', token); // לדוגמה, ניתן לשנות בהתאם לצורך
                onAdd();
            }
        } catch (error) {
            console.error('Failed to add product to cart.', error);
        }
    };

    return (
        <button onClick={handleAddToCart} className="add-to-cart-button">
            <FiShoppingCart size={24} />
           Add to cart
        </button>
    );
};

export default AddToCartButton;
