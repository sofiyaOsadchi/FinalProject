
export type IName = {
    first: string;
    middle?: string;
    last: string;
};

export type IAddress = {
    street: string;
    city: string;
    state?: string;
    zip?: string;
    country: string;
    houseNumber: number;
};

export type IImage = {
    alt: string;
    url: string;
};

export type RegisterUser = {
    name: {
        first: string;
        middle?: string;
        last: string;
    };
    phone: string;
    email: string;
    password: string;
    image?: {
        url: string;
        alt?: string;
    };
    address: {
        state?: string;
        country: string;
        city: string;
        street: string;
        houseNumber: number;
        zip: number;
    };
};

export type ILogin = {
    email: string;
    password: string;
};

export type IUserInput = {
    email: string;
    phone: string;
    password: string;
    address: IAddress;
    name: IName;
    image?: IImage;
};

export type IUser = IUserInput & {
    id: string;
    createdAt: Date;
    isAdmin: boolean;
    cart: ICartProduct[];
};

export interface AuthContextProviderProps {
    children: ReactNode;
}

/* export type User = {
    _id: string
    isBusiness: boolean
    email: string
    name: {
        first: string
        middle: string
        last: string
    },
    phone: string
    address: {
        street: string
        city: string
        state: string
        zip: string
    }
} */

export type ICartProduct = {
    productId: string;
    title: string;
    price: number;
    size: string;
};

export type ILogin = {
    email: string;
    password: string;
};

export type IJWTPayload = {
    _id: string;
    isAdmin: boolean;
  /*   isBusiness: boolean; */
};

export type IProductInput = {
    title: string;
    subtitle: string;
    description: string;
    price: number;
    image: IImage;
    size: string;
    quantity: number;
    barcode: number;
};

export type IProduct = IProductInput & {
    _id: string;
    barcode: number;
    createdAt: Date;
    shoppingCart: string[];
    quantity: number;
    sold: number;
    userId: string;
};

export type IOrderProduct = {
    productId: string;
    quantity: number;
    size: string;
};

export type IOrder = {
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


export interface AuthContextType {
    token: string | null;
    user: IUser | undefined;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<void>
    register: (form: IUser) => Promise<void>
    logout: () => void;
}

export interface DecodedToken {
    _id: string;
    // ניתן להוסיף כאן שדות נוספים מהטוקן לפי הצורך
}