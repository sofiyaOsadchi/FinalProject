import { FC, useEffect, useState } from 'react';
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { IProduct } from '../@Types/productType';
import AddToCartButton from '../components/AddToCartButton';
import { useSearch } from '../hooks/useSearch';
import { getAllProducts } from '../services/product';
import './Products.scss';

const Products: FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { searchTerm } = useSearch();
    const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts();
                console.log(response);
                setProducts(response.data);
                const initialSizes = response.data.reduce((acc: { [key: string]: string }, product: IProduct) => {
                    acc[product._id] = product.variants[0].size;
                    return acc;
                }, {});
                setSelectedSizes(initialSizes);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        [product.title, product.subtitle, product.description].some(field =>
            field.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="product-list-wrapper">
            <h1 className="product-list-title">Our Products</h1>
            <div className="product-list-container">
                {filteredProducts.length === 0 ? (
                    <p>No products found</p>
                ) : (
                    filteredProducts.map(product => (
                        <Card key={product._id} className="product-card">
                            <Link to={`/products/${product._id}`} className="product-link">
                                <img src={product.image.url} alt={product.alt} className="w-full h-48 object-cover rounded-t-lg" />
                                <div className="product-info">
                                    <h5 className="text-xl font-bold">{product.title}</h5>
                                    <h6 className="text-md font-semibold">{product.subtitle}</h6>
                                    <p>{product.description}</p>
                                </div>
                            </Link>
                            <AddToCartButton
                                productId={product._id}
                                variants={product.variants}
                                title={product.title}
                                image={product.image}
                            />
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default Products;