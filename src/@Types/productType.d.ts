export type IImage = {
    url?: string;
};

export type IVariant = {
    _id?: string;
    size: string;
    quantity: number;
    price: number;
};

//types for product
export type IProductInput = {
    title: string;
    subtitle: string;
    description: string;
    image: IImage;
    alt: string;
    sizes: string[];
    barcode: number;
    variants: IVariant[];
};

//types for product with more properties
export type IProduct = IProductInput & {
    _id: string;
    createdAt: Date;
    shoppingCart: string[];
    sold: number;
    userId: string;
};

export interface AddToCartButtonProps {
    productId: string;
    variants: IVariant[];
    title: string;
    image: IImage;
}

export interface ICartItem {
    productId: string;
    variantId: string;
    title: string;
    price: number;
    size: string;
    quantity: number;
    image: IImage;
}


export interface ICart {
    userId?: string; // הפיכת userId לאופציונלי כדי לתמוך במשתמשי אורח
    items: ICartItem[];
    isGuest?: boolean; // הוספת שדה חדש לזיהוי האם מדובר במשתמש אורח
}

export interface CartContextProps {
    cart: ICartWithTotals | null;
    setCart: Dispatch<SetStateAction<ICartWithTotals | null>>;
    fetchCart: () => void;
    addToCart: (productId: string, variantId: string, quantity: number, size: string, price: number, isGuest?: boolean) => Promise<void>;
    mergeGuestCartToUserCart: () => void; // הוספת פונקציה למיזוג עגלת אורח
}

// טיפוס עבור עגלת קניות עם סיכומים
export interface ICartWithTotals extends ICart {
    totalQuantity: number;
    totalPrice: number;
} 




export type IOrderProduct = {
    productId: string;
    quantity: number;
    size: string;
    title: string;
    price: number;
};

export type IOrder = {
    _id: string;
    orderId: string;
    userId: string;
    products: IOrderProduct[];
    totalAmount: number;
    status: string;
    createdAt: string; // Assuming it's a string, convert it if necessary
    orderNumber: string;

};

export type OrderResponse = {
    count: number;
    orders: IOrder[];
};


export interface DateRangePickerProps {
    startDate: Date | null;
    endDate: Date | null;
    onStartDateChange: (date: Date | null) => void;
    onEndDateChange: (date: Date | null) => void;
}