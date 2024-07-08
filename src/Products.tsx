// ProductList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'flowbite-react';
import { IProduct } from './@Types/types'; 

import './Products.scss'; 

const Products: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        axios.get<IProduct[]>('http://localhost:8080/api/v1/products')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="product-list-container">
            {products.map(product => (
                <Card key={product._id} className="product-card">
                    <img src={product.image.url} alt={product.image.alt} className="w-full h-48 object-cover rounded-t-lg" />
                    <h5 className="text-xl font-bold">{product.title}</h5>
                    <h6 className="text-md font-semibold">{product.subtitle}</h6>
                    <p>{product.description}</p>
                    <p className="text-lg font-semibold">${product.price}</p>
                    <p>Size: {product.size}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Barcode: {product.barcode}</p>
                    <button className="buy-now-button">Buy Now</button>
                </Card>
            ))}
        </div>
    );
};

export default Products;
