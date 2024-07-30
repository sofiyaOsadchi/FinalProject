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

// טיפוס עבור עגלת קניות
export interface ICart {
    userId: string;
    items: ICartItem[];
}

// טיפוס עבור עגלת קניות עם סיכומים
export interface ICartWithTotals extends ICart {
    totalQuantity: number;
    totalPrice: number;
}

// טיפוס עבור הקונטקסט של עגלת הקניות
export interface CartContextProps {
    cart: ICartWithTotals | null;
    setCart: Dispatch<SetStateAction<ICartWithTotals | null>>;
    fetchCart: () => void;
    addToCart: (productId: string, variantId: string, quantity: number, size: string, price: number) => Promise<void>;
}


export type IOrderProduct = {
    productId: string;
    quantity: number;
    size: string;
    title: string; // הוספת title
    price: number; // הוספת price

};

export type IOrder = {
    _id: string;
    userId: string;
    products: IOrderProduct[];
    totalAmount: number;
    status: string;
    createdAt: Date;
    orderNumber: string;
};

export interface SalesByDateQuery {
    startDate: string;
    endDate: string;
};


export interface CartContextProps {
    cart: ICartWithTotals | null;
    setCart: Dispatch<SetStateAction<ICartWithTotals | null>>;
    fetchCart: () => void;
    addToCart: (productId: string, variant: IVariant) => void; // Removed price
}
export interface DateRangePickerProps {
    startDate: Date | null;
    endDate: Date | null;
    onStartDateChange: (date: Date | null) => void;
    onEndDateChange: (date: Date | null) => void;
}