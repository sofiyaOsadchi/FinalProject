import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/product';
import { IProduct } from '../@Types/productType';
import './Product.scss';
import AddToCartButton from '../components/AddToCartButton';

    const Product = () => {
        const { id } = useParams();
        const [product, setProduct] = useState<IProduct>();

        useEffect(() => {
            getProductById(id || "")
                .then(res => {
                    setProduct(res.data);
                })
                .catch(err => console.log(err));
        }, [id]);

        if (!product) {
            return <div>Loading...</div>;
        }


    return (
        <div className="product-page">
            <h1 className="product-title">{product.title}</h1>
            <h2 className="product-subtitle">{product.subtitle}</h2>
            <img className="product-image" src={product.image.url} alt={product.alt} />
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <p className="product-size">Size: {product.size}</p>
            <p className="product-quantity">
                {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
            </p>
            <p className="product-barcode">Barcode: {product.barcode}</p>
            <AddToCartButton productId={product._id} onAdd={() => console.log("Product added to cart")} />
            
        </div>
    );
};

export default Product