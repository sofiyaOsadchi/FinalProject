// Products.tsx
import  { useState, useEffect, FC } from 'react';
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';
import './Products.scss';
import { IProduct } from '../@Types/productType';
import { getAllProducts } from '../services/product';
import { useSearch } from '../hooks/useSearch';
import cart from '../services/cart';
import AddToCartButton from '../components/AddToCartButton';

const Products: FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { searchTerm } = useSearch();
    const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({}); // Track selected sizes

    useEffect(() => {
        getAllProducts()
            .then(response => {
                setProducts(response.data);
                setLoading(false);

                const initialSizes = response.data.reduce((acc: { [key: string]: string }, product: IProduct) => {
                    acc[product._id] = product.sizes[0]; // Use the first size as default
                    return acc;
                }, {});
                setSelectedSizes(initialSizes);
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

    const handleSizeSelect = (productId: string, size: string) => {
        setSelectedSizes(prevSizes => ({
            ...prevSizes,
            [productId]: size,
        }));
    };


    const handleAddToCart = async (productId: string) => {
        const size = selectedSizes[productId];
        if (!size) {
            alert('Please select a size.');
            return;
        }
        try {
            await cart.addProductToCart(productId, 1, size);
            alert('Product added to cart!');
        } catch (error) {
            console.error('Failed to add product to cart.', error);
        }
    };


    return (
        <div className="product-list-container">
            {filteredProducts.map(product => (
                <Card key={product._id} className="product-card">
                    <Link to={`/products/${product._id}`}>
                        <img src={product.image.url} alt={product.alt} className="w-full h-48 object-cover rounded-t-lg" />
                        <h5 className="text-xl font-bold">{product.title}</h5>
                        <h6 className="text-md font-semibold">{product.subtitle}</h6>
                        <p>{product.description}</p>
                        <div className="price-container">
                            <span className="original-price" style={{ marginRight: '10px' }}>
                                ${(product.price * 1.2).toFixed(2)}
                            </span>
                            <span className="discounted-price">
                                ${product.price.toFixed(2)}
                            </span>
                        </div>

                        <div className="size-buttons-container">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    className={`size-button ${selectedSizes[product._id] === size ? 'selected' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSizeSelect(product._id, size);
                                    }}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        <p>{product.quantity > 0 ? 'In Stock' : 'Out of Stock'}</p>
                    </Link>
                    <AddToCartButton
                        productId={product._id}
                        title={product.title}
                        price={product.price}
                        image={product.image.url}
                        size={selectedSizes[product._id] || product.sizes[0]} // Default to first size if none selected
                        onAdd={() => console.log("Product added to cart")}
                    />
                </Card>
            ))}
        </div>
    );
};

export default Products;