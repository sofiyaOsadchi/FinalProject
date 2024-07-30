import { createContext, useState, useEffect, FC } from 'react';
import cartService from '../services/cart';
import { CartContextProps, ICartWithTotals } from '../@Types/productType';
import { ContextProviderProps } from '../@Types/types';
import { useAuth } from '../hooks/useAuth';


export const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: FC<ContextProviderProps> = ({ children }) => {
    const { token } = useAuth();
    const [cart, setCart] = useState<ICartWithTotals | null>(null);


    const fetchCart = async () => {
        if (!token) return setCart(null);
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

    const addToCart = async (productId: string, variantId: string, quantity: number, size: string, price: number) => {
        try {
            console.log('Sending request to add to cart:', { productId, variantId, quantity, size, price });
            await cartService.addProductToCart(productId, variantId, quantity, size, price);
            fetchCart(); // עדכן את מצב העגלה לאחר הוספה
        } catch (error) {
            console.error('Error adding to cart', error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, setCart, fetchCart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
