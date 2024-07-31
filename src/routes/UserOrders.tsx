import { useEffect, useState } from 'react';
import orderService from '../services/order';
import { IOrder } from '../@Types/productType';
import './OrderConfirmation.scss';
import { useAuth } from '../hooks/useAuth';

const UserOrders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (user) {
                    const res = await orderService.getOrdersByUser(user._id);
                    setOrders(res.data);
                }
            } catch (err) {
                console.error('Error fetching orders:', err);
            }
        };

        fetchOrders();
    }, [user]);
    return (
        <div className="order-confirmation-page">
            <h1 className="order-title">Order Confirmation</h1>
            {orders.map(order => (
                <div key={order._id} className="order-details-container">
                    <h2 className="order-title">Order #{order.orderNumber}</h2>
                    <div className="order-summary">
                        {order.products.map((product, index) => (
                            <div key={`${product.productId}-${index}`} className="order-item">
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

export default UserOrders;
