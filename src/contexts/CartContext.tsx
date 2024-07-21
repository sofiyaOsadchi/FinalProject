import { createContext, useContext, useState, useEffect, FC } from 'react';
import cartService from '../services/cart';
import { CartContextProps, ICartWithTotals } from '../@Types/productType';
import { ContextProviderProps } from '../@Types/types';


export const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: FC<ContextProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<ICartWithTotals | null>(null);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await cartService.getCart(token);
                setCart(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch cart.', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <CartContext.Provider value={{ cart, setCart, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};
