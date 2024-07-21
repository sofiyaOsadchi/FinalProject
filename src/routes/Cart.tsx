import cartService from '../services/cart';
import { ICartItem } from '../@Types/productType'; // עדכון לפי הטיפוסים המוגדרים
import './Cart.scss';
import { useCart } from '../hooks/useCart';

const Cart = () => {
    const { cart, fetchCart } = useCart();


    const handleRemoveItem = async (productId: string) => {
        try {
            await cartService.removeProductFromCart(productId, 1);
            fetchCart(); // רענון העגלה לאחר הסרת מוצר
        } catch (error) {
            console.error('Failed to remove product from cart.', error);
        }
    };

    const handleClearCart = async () => {
        try {
            await cartService.clearCart();
            fetchCart(); // רענון העגלה לאחר ניקוי
        } catch (error) {
            console.error('Failed to clear cart.', error);
        }
    };

    if (!cart || cart.items.length === 0) {
        return <div>Your cart is empty</div>;
    }

    return (
        <div className="cart-page">
            <h1 className="cart-title">Your Shopping Cart</h1>
            <div className="cart-items">
                {cart.items.map((item: ICartItem) => (
                    <div className="cart-item" key={item.productId}>
                        <h2 className="item-title">{item.title}</h2>
                        <p className="item-quantity">Quantity: {item.quantity}</p>
                        <p className="item-price">Price: ${item.price.toFixed(2)}</p>
                        <button onClick={() => handleRemoveItem(item.productId)}>Remove</button>
                    </div>
                ))}
            </div>
            <div className="cart-totals">
                <p>Total Items: {cart.totalQuantity}</p>
                <p>Total Price: ${cart.totalPrice.toFixed(2)}</p>
            </div>
            <button onClick={handleClearCart} className="clear-cart-button">Clear Cart</button>
        </div>
    );
};

export default Cart;
