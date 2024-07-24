import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import orderService from '../services/order';
import { IOrder } from '../@Types/productType';
import './OrderConfirmation.scss'
import { useAuth } from '../hooks/useAuth';

const OrderConfirmation = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            orderService.getOrdersByUser(user._id)
                .then(res => setOrders(res.data))
                .catch(err => console.log(err));
        }
    }, [user]);

    if (!user) {
        return (
            <div className="order-confirmation-page">
                <h2 className="order-title">Please log in to see your orders.</h2>
            </div>
        );
    }

    return (
        <div className="order-confirmation-page">
            <h1 className="order-title">Order Confirmation</h1>
            {orders.map(order => (
                <div key={order._id} className="order-details-container">
                    <h2 className="order-title">Order #{order._id}</h2>
                    <div className="order-summary">
                        {order.products.map(product => (
                            <div key={product.productId} className="order-item">
                                <span className="item-title">{product.title}</span>
                                <span className="item-size">Size: {product.size}</span>
                                <span className="item-price">Price: ${product.price.toFixed(2)}</span>
                                <span className="item-quantity">Quantity: {product.quantity}</span>
                            </div>
                        ))}
                        <div className="summary-total">
                            <span>Total Amount</span>
                            <span>${order.totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderConfirmation;
