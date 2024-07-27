import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import cart from '../services/cart';
import './AddToCartButton.scss';
import { useCart } from '../hooks/useCart';
import dialogs from '../ui/dialogs';

const AddToCartButton: React.FC<{ productId: string, title: string, price: number, image: string, size: string, onAdd: () => void }> = ({ productId, title, price, image, size, onAdd }) => {
    const { fetchCart } = useCart();
    const handleAddToCart = async () => {
        try {
            await cart.addProductToCart(productId, 1, size); // לדוגמה, ניתן לשנות בהתאם לצורך
            dialogs.showPopup(
                'Product Added',
                `<div style="display: flex; align-items: center;">
                    <img src="${image}" alt="${title}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;" />
                    <div>
                        <p>${title} has been added to your cart.</p>
                        <p>Price: $${price.toFixed(2)}</p>
                    </div>
                </div>`
            );
            fetchCart();
            onAdd();

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
