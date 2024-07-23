import cartService from '../services/cart';
import { ICartItem } from '../@Types/productType'; // עדכון לפי הטיפוסים המוגדרים
import './Cart.scss';
import { useCart } from '../hooks/useCart';
import {  FiArrowLeft, FiTrash } from 'react-icons/fi'; // Importing FiArrowLeft from react-icons/fi
import dialogs from '../ui/dialogs';
import { Link } from 'react-router-dom'; // Importing Link from react-router-dom
import { useEffect, useState } from 'react';
import { Tooltip } from 'flowbite-react';
import { useAuth } from '../hooks/useAuth';

const Cart = () => {

    const { cart, fetchCart } = useCart();
    const { token } = useAuth();
    const [quantities, setQuantities] = useState<{ [productId: string]: number }>({});

    useEffect(() => {
        if (token) {
            fetchCart();
        }
    }, [token, fetchCart]);

    const handleRemoveItem = async (productId: string) => {
        try {
            await cartService.removeProductFromCart(productId);
            fetchCart(); // רענון העגלה לאחר הסרת מוצר
        } catch (error) {
            console.error('Failed to remove product from cart.', error);
        }
    };

    const handleClearCart = async () => {
        const result = await dialogs.confirm("Clear Cart", "Are you sure you want to clear the cart?");
        if (result.isConfirmed) {
            try {
                await cartService.clearCart();
                fetchCart(); // רענון העגלה לאחר ניקוי
                dialogs.success("Cart Cleared", "Your cart has been cleared successfully.");
            } catch (error) {
                console.error('Failed to clear cart.', error);
                dialogs.error("Error", "Failed to clear the cart.");
            }
        }
    };

    const handleQuantityChange = async (productId: string, newQuantity: number) => {
        try {
            setQuantities(prevQuantities => ({
                ...prevQuantities,
                [productId]: newQuantity,
            }));
            await cartService.updateProductQuantity(productId, newQuantity);
            fetchCart();
        } catch (error) {
            console.error('Failed to update product quantity.', error);
        }
    };

    if (!cart || cart.items.length === 0) {
        return (
            <div className="empty-cart flex flex-col items-center justify-center">
                <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
                <p className="text-lg mb-4">Should we start shopping?</p>
                <Link to="/" className="back-to-shopping text-blue-800 hover:underline flex items-center">
                    <FiArrowLeft className="mr-2" />
                    Back to Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-page flex flex-col md:flex-row">
            <div className="cart-items-container w-full md:w-3/4 p-4">
                <Link to="/" className="back-to-shopping text-blue-800 hover:underline mb-4 flex items-center">
                    <FiArrowLeft className="mr-2" />
                    Back to Shopping
                </Link> {/* Back to Shopping Link */}
                <div className="flex justify-between items-center mb-4 border-b pb-4">
                    <h1 className="cart-title text-2xl font-semibold">Your Shopping Cart</h1>
                    <Link to="#" onClick={handleClearCart} className="clear-cart-link text-red-500 hover:underline">Clear Cart</Link> {/* Clear Cart Link */}
                </div>
                <div className="cart-items space-y-4">
                    {cart.items.map((item: ICartItem) => (
                        <div className="cart-item flex justify-between items-center p-4 border rounded-lg shadow-sm" key={item.productId}>
                            <div className="flex items-center">
                                <img src={item.image.url} className="w-20 h-20 object-cover rounded-lg mr-4" />
                                <div>
                                    <Link to={`/products/${item.productId}`} className="item-title text-lg font-medium text-blue-500 hover:underline">{item.title}</Link> {/* Product Title Link */}
                                    <p className="item-size text-sm text-gray-500">Size: {item.size}</p>
                                    <p className="item-price text-sm text-gray-500">Price: ${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <label htmlFor={`quantity-${item.productId}`} className="item-quantity text-sm text-gray-500 mr-2">Quantity:</label>
                                <select
                                    id={`quantity-${item.productId}`}
                                    value={quantities[item.productId] || item.quantity}
                                    onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                                    className="ml-2 border border-gray-300 rounded-md p-1"
                                >
                                    {[...Array(10).keys()].map((n) => (
                                        <option key={n + 1} value={n + 1}>
                                            {n + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={() => handleRemoveItem(item.productId)}
                                className="remove-button"
                            >
                                <Tooltip
                                    content="Remove product"
                                    placement="top"
                                    className="text-sm bg-gray-800 text-white rounded px-2 py-1"
                                >
                                    <FiTrash />
                                </Tooltip>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="cart-summary w-full md:w-1/4 p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Summary</h2>
                <div className="space-y-2 flex flex-col">
                    <div className='flex justify-between'>
                        <span>Total Items</span>
                        <span>{cart.totalQuantity}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span>Total Price</span>
                        <span>${cart.totalPrice.toFixed(2)}</span>
                    </div>
                </div>
                <button className="checkout-button">Checkout</button> {/* הוספת הכפתור של Checkout */}
            </div>
        </div>
    );
};

export default Cart;
