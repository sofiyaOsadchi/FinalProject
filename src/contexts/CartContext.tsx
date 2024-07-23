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
            console.error('Failed to fetch cart.', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [token]);

    return (
        <CartContext.Provider value={{ cart, setCart, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};
