import { createContext, useState, useEffect, FC } from 'react';
import cartService from '../services/cart';
import { CartContextProps, ICartWithTotals, ICartItem } from '../@Types/productType';
import { ContextProviderProps } from '../@Types/types';
import { useAuth } from '../hooks/useAuth';


export const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: FC<ContextProviderProps> = ({ children }) => {
    const { token } = useAuth();
    const [cart, setCart] = useState<ICartWithTotals | null>(null);

    const fetchCart = async () => {
        if (!token) {
            // במידה ואין טוקן, משתמש אורח - נשלוף עגלה מהלוקל סטורג'
            const guestCart = localStorage.getItem('guestCart');
            if (guestCart) {
                setCart(JSON.parse(guestCart));
            } else {
                setCart(null);
            }
            return;
        }
        try {
            const response = await cartService.getCart();
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching cart', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [token]);

    const addToCart = async (productId: string, variantId: string, quantity: number, size: string, price: number, isGuest: boolean = false) => {
        try {
            console.log('Sending request to add to cart:', { productId, variantId, quantity, size, price, isGuest });
            if (isGuest) {
                // הוספה לעגלה בלוקל סטורג' עבור משתמש אורח
                const guestCart = localStorage.getItem('guestCart');
                let cart: ICartWithTotals = guestCart ? JSON.parse(guestCart) : { items: [], totalQuantity: 0, totalPrice: 0 };
                const itemIndex = cart.items.findIndex(item => item.productId === productId && item.variantId === variantId && item.size === size);

                if (itemIndex > -1) {
                    cart.items[itemIndex].quantity += quantity;
                } else {
                    cart.items.push({ productId, variantId, quantity, size, title: '', price, image: { url: '' } });
                }

                // עדכון סה"כ כמות ומחיר
                cart.totalQuantity += quantity;
                cart.totalPrice += price * quantity;

                localStorage.setItem('guestCart', JSON.stringify(cart));
                setCart(cart);
            } else {
                // הוספה לעגלה בשרת עבור משתמש מחובר
                await cartService.addProductToCart(productId, variantId, quantity, size, price);
                fetchCart();
            }
        } catch (error) {
            console.error('Error adding to cart', error);
        }
    };

    const mergeGuestCartToUserCart = async () => {
        const guestCart = localStorage.getItem('guestCart');
        if (guestCart && token) {
            const cartItems: ICartItem[] = JSON.parse(guestCart).items;
            for (const item of cartItems) {
                await addToCart(item.productId, item.variantId, item.quantity, item.size, item.price, false);
            }
            localStorage.removeItem('guestCart');
            fetchCart();
        }
    };

    useEffect(() => {
        if (token) {
            mergeGuestCartToUserCart();
        }
    }, [token]);

    return (
        <CartContext.Provider value={{ cart, setCart, fetchCart, addToCart, mergeGuestCartToUserCart }}>
            {children}
        </CartContext.Provider>
    );
};