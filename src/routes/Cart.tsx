import { useCart } from '../hooks/useCart';
import { FiArrowLeft, FiTrash } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Tooltip } from 'flowbite-react';
import { useAuth } from '../hooks/useAuth';
import dialogs from '../ui/dialogs';
import './Cart.scss';
import { cartService } from '../services/cart';
import { createOrder } from '../services/order';
import { useSearch } from '../hooks/useSearch';
import { ICartItem } from '../@Types/productType';

const Cart = () => {
    const { cart, fetchCart } = useCart();
    const { searchTerm } = useSearch();
    const { token } = useAuth();
    const navigate = useNavigate();
    const [quantities, setQuantities] = useState<{ [variantId: string]: number }>({});

    useEffect(() => {
        if (token) {
            fetchCart(); // Fetch cart items when token changes (e.g., on login)
        }

    }, [token]);

    const handleRemoveItem = async (variantId: string) => {
        try {
            await cartService.removeProductFromCart(variantId);
            fetchCart(); // Refresh cart after removal
        } catch (error) {
            console.error('Failed to remove product from cart.', error);
        }
    };

    const handleClearCart = async () => {
        const result = await dialogs.confirm("Clear Cart", "Are you sure you want to clear the cart?");
        if (result.isConfirmed) {
            try {
                await cartService.clearCart();
                fetchCart(); // Refresh cart after clearing
                dialogs.success("Cart Cleared", "Your cart has been cleared successfully.");
            } catch (error) {
                console.error('Failed to clear cart.', error);
                dialogs.error("Error", "Failed to clear the cart.");
            }
        }
    };

    const handleQuantityChange = async (variantId: string, newQuantity: number) => {
        console.log('מעודכן כמות עבור variantId:', variantId, 'ל:', newQuantity); // בדוק מה מודפס כאן
        if (!variantId) {
            console.error('variantId is undefined');
            return;
        }
        try {
            await cartService.updateProductQuantity(variantId, newQuantity);
            fetchCart(); // עדכן את הסל כדי לשקף את השינויים
        } catch (error) {
            console.error('שגיאה בעדכון כמות המוצר:', error.response?.data || error.message);
        }
    };


    const handleCheckout = async () => {

        try {
            if (!token) {
                dialogs.error("Error", "You must be logged in to checkout.");
                return;
            }

            const orderProducts = cart.items.map((item: ICartItem) => ({
                productId: item.productId,
                variantId: item.variantId,
                quantity: item.quantity,
                size: item.size,
                title: item.title,
                price: item.price,
            }));

            const response = await createOrder(orderProducts);
            const orderId = response.data._id;
            dialogs.success("Order Successful", "Your order has been placed successfully.").then(async () => {
                await cartService.clearCart();
                fetchCart(); // Refresh cart after order placement
                navigate(`/order-confirmation/${orderId}`);
            });
        } catch (error) {
            console.error('Failed to place order.', error);
            dialogs.error("Error", "Failed to place the order.");
        }
    };

    if (!cart || !cart.items || cart.items.length === 0) {
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
                </Link>
                <div className="flex justify-between items-center mb-4 border-b pb-4">
                    <h1 className="cart-title text-2xl font-semibold">Your Shopping Cart</h1>
                    <Link to="#" onClick={handleClearCart} className="clear-cart-link text-red-500 hover:underline">Clear Cart</Link>
                </div>
                <div className="cart-items space-y-4">
                    {cart.items
                        .filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase())) // Filter items based on search term
                        .map((item: ICartItem) => (
                            <div className="cart-item flex flex-col p-4 border rounded-lg shadow-sm" key={item.productId + item.variantId}>
                                <div className="flex items-center mb-4">
                                    <img src={item.image.url} className="w-20 h-20 object-cover rounded-lg mr-4" />
                                    <div>
                                        <Link to={`/products/${item.productId}`} className="item-title text-lg font-medium text-[#333] hover:underline">{item.title}</Link>
                                    </div>
                                </div>
                                <div className="variant flex justify-between items-center mb-4">
                                    <div>
                                        <p className="item-size text-sm text-gray-500">Size: {item.size}</p>
                                        <p className="item-price text-sm text-gray-500">Price: ${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center select-quantity">
                                        <label htmlFor={`quantity-${item.variantId}`} className="item-quantity text-sm text-gray-500 mr-2">Quantity:</label>
                                        <select
                                            id={`quantity-${item.variantId}`}
                                            value={quantities[item.variantId] || item.quantity}
                                            onChange={(e) => handleQuantityChange(item.variantId, parseInt(e.target.value))}
                                            className="ml-2 border border-gray-300 rounded-md p-1 selector"
                                        >
                                            {[...Array(10).keys()].map((n) => (
                                                <option key={n + 1} value={n + 1}>
                                                    {n + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveItem(item.variantId)}
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
                <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
            </div>
        </div>
    );
};

export default Cart;