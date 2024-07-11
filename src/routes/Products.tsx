// ProductList.tsx
import  { useState, useEffect, FC } from 'react';
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';
import './Products.scss';
import { IProduct } from '../@Types/productType';
import { getAllProducts } from '../services/product';
import { useSearch } from '../hooks/useSearch';

const Products: FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { searchTerm } = useSearch();

    useEffect(() => {
        getAllProducts()
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="product-list-container">
            {filteredProducts.map(product => (
                <Card key={product._id} className="product-card">
                    <Link to={`/products/${product._id}`}>
                        <img src={product.image.url} alt={product.image.alt} className="w-full h-48 object-cover rounded-t-lg" />
                        <h5 className="text-xl font-bold">{product.title}</h5>
                        <h6 className="text-md font-semibold">{product.subtitle}</h6>
                        <p>{product.description}</p>
                        <p className="text-lg font-semibold">${product.price}</p>
                        <p>Size: {product.size}</p>
                        <p>Quantity: {product.quantity}</p>
                        <p>Barcode: {product.barcode}</p>
                        <button className="buy-now-button">Buy Now</button>
                    </Link>
                </Card>
            ))}
        </div>
    );
};

export default Products;