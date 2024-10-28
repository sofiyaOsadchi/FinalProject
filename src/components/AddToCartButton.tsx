import { FC, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import './AddToCartButton.scss';
import { AddToCartButtonProps, IVariant } from '../@Types/productType';
import useCart from '../hooks/useCart';
import dialogs from '../ui/dialogs';
import { useAuth } from '../hooks/useAuth';

const AddToCartButton: FC<AddToCartButtonProps> = ({ productId, variants, title, image }) => {
    const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(variants[0] || null);
    const { addToCart } = useCart();
    const { isLoggedIn } = useAuth();

    const handleAddToCart = async () => {
        if (selectedVariant) {
            console.log("Adding product to cart:", selectedVariant);
            try {
                await addToCart(productId, selectedVariant._id, 1, selectedVariant.size, selectedVariant.price, !isLoggedIn);

                dialogs.success(
                    "Product Added",
                    `<div style="display: flex; align-items: center;">
                        <img src="${image.url}" alt="${title}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;" />
                        <div>
                            <p>${title} has been added to your cart${!isLoggedIn ? " (Guest)" : ""}.</p>
                        </div>
                    </div>`
                );
            } catch (error) {
                console.error("Failed to add product to cart:", error);
                dialogs.error("Error", "Failed to add the product to your cart.");
            }
        } else {
            console.error("No variant selected");
        }
    };

    return (
        <div className="add-to-cart-container">
            <p> {selectedVariant?.quantity > 0 ? 'In Stock' : 'Out of Stock'}</p>
            <div className="price-container" style={{ marginBottom: '20px', marginTop: '15px' }}>
                <span className="original-price" style={{ marginRight: '10px' }}>
                    ${(selectedVariant?.price * 1.2).toFixed(2)}
                </span>
                <span className="discounted-price">
                    ${selectedVariant?.price.toFixed(2)}
                </span>
            </div>
            <div className="size-buttons-container">
                {variants.map(variant => (
                    <button
                        key={variant._id}
                        className={`size-button ${selectedVariant && selectedVariant._id === variant._id ? 'selected' : ''}`}
                        onClick={() => setSelectedVariant(variant)}
                    >
                        {variant.size}
                    </button>
                ))}
            </div>
            <button className="add-to-cart-button" onClick={handleAddToCart} disabled={!selectedVariant}>
                <FiShoppingCart />
                Add to Cart
            </button>
        </div>
    );
};

export default AddToCartButton;
