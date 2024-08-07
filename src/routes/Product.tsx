import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../services/product';
import { IProduct } from '../@Types/productType';
import './Product.scss';
import AddToCartButton from '../components/AddToCartButton';
import { Accordion } from 'flowbite-react';
import cart from '../services/cart';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        getProductById(id || "")
            .then(res => {
                setProduct(res.data);
                setSelectedVariant(res.data.variants[0]._id);
            })
            .catch(err => console.log(err));
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleAddToCartAndRedirect = async () => {
        if (!selectedVariant) {
            console.error('No variant selected');
            return;
        }
        try {
            await cart.addProductToCart(product._id, selectedVariant, 1, product.variants.find(v => v._id === selectedVariant)?.size || '', product.variants.find(v => v._id === selectedVariant)?.price || 0);
            navigate('/cart');
        } catch (error) {
            console.error('Failed to add product to cart.', error);
        }
    };

    return (
        <div className="product-page">
            <div className="product-image-container">
                <img className="product-image" src={product.image.url} alt={product.alt} />
                <div className="additional-images">
                    {/* <img src={product.image.url} alt={product.alt} className="additional-image" />
                    <img src={product.image.url} alt={product.alt} className="additional-image" />
                    <img src={product.image.url} alt={product.alt} className="additional-image" /> */}
                </div>
            </div>
            <div className="product-details">
                <h1 className="product-title">{product.title}</h1>
                <h2 className="product-subtitle">{product.subtitle}</h2>
                <h3 className="product-description">{product.description}</h3>
                <div className="buttons-container">
                    <AddToCartButton
                        productId={product._id}
                        variants={product.variants}
                        title={product.title}
                        image={product.image}
                    />
                    <button className="consult-expert-button" onClick={handleAddToCartAndRedirect}>Buy Now</button>
                </div>
                <Accordion>
                    <Accordion.Panel>
                        <Accordion.Title>Description</Accordion.Title>
                        <Accordion.Content>
                            <p className='dark:text-white'>{product.description}</p>
                        </Accordion.Content>
                    </Accordion.Panel>
                    <Accordion.Panel>
                        <Accordion.Title>Shipping Info</Accordion.Title>
                        <Accordion.Content>
                            <p>Ships by: <strong>Wednesday, July 24</strong></p>
                            <p className='dark:text-white'>Free Fast Shipping</p>
                            <p className='dark:text-white'>Free Overnight Shipping, Hassle-Free Returns</p>
                        </Accordion.Content>
                    </Accordion.Panel>
                </Accordion>
            </div>
        </div>
    );
};

export default Product;




/* import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../services/product';
import { IProduct } from '../@Types/productType';
import './Product.scss';
import AddToCartButton from '../components/AddToCartButton';
import { Accordion } from 'flowbite-react';
import cart from '../services/cart';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        getProductById(id || "")
            .then(res => {
                setProduct(res.data);
                setSelectedVariant(res.data.variants[0]._id);
            })
            .catch(err => console.log(err));
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleAddToCartAndRedirect = async () => {
        if (!selectedVariant) {
            console.error('No variant selected');
            return;
        }
        try {
            await cart.addProductToCart(product._id, selectedVariant, 1, product.variants.find(v => v._id === selectedVariant)?.size || '', product.variants.find(v => v._id === selectedVariant)?.price || 0);
            navigate('/cart');
        } catch (error) {
            console.error('Failed to add product to cart.', error);
        }
    };

    return (
        <div className="product-page">
            <div className="product-image-container">
                <img className="product-image" src={product.image.url} alt={product.alt} />
                <div className="additional-images">
                    <img src={product.image.url} alt={product.alt} className="additional-image" />
                    <img src={product.image.url} alt={product.alt} className="additional-image" />
                    <img src={product.image.url} alt={product.alt} className="additional-image" />
                </div>
            </div>
            <div className="product-details">
                <h1 className="product-title">{product.title}</h1>
                <h2 className="product-subtitle">{product.subtitle}</h2>
                <h3 className="product-description">{product.description}</h3>
                <p className="stock">{product.variants.find(v => v._id === selectedVariant)?.quantity > 0 ? 'In Stock' : 'Out of Stock'}</p>
              
                <div className="buttons-container">
                    <AddToCartButton
                        productId={product._id}
                        variants={product.variants}
                        title={product.title}
                        image={product.image}
                    />
                    <button className="consult-expert-button" onClick={handleAddToCartAndRedirect}>Buy Now</button>
                </div>
                <Accordion>
                    <Accordion.Panel>
                        <Accordion.Title>Description</Accordion.Title>
                        <Accordion.Content>
                            <p>{product.description}</p>
                        </Accordion.Content>
                    </Accordion.Panel>
                    <Accordion.Panel>
                        <Accordion.Title>Shipping Info</Accordion.Title>
                        <Accordion.Content>
                            <p>Ships by: <strong>Wednesday, July 24</strong></p>
                            <p>Free Fast Shipping</p>
                            <p>Free Overnight Shipping, Hassle-Free Returns</p>
                        </Accordion.Content>
                    </Accordion.Panel>
                </Accordion>
            </div>
        </div>
    );
};

export default Product; */