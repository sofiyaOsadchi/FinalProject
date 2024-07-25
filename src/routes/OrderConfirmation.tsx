/* import { useEffect, useState } from 'react';
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
 */


import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import orderService from '../services/order';
import { IOrder } from '../@Types/productType';
import './OrderConfirmation.scss'
import { useAuth } from '../hooks/useAuth';
import { FiArrowLeft, FiX } from 'react-icons/fi';
import dialogs from '../ui/dialogs';
import { Tooltip } from 'flowbite-react';

const OrderConfirmation = () => {
    const [order, setOrder] = useState<IOrder | null>(null);
    const [orders, setOrders] = useState<IOrder[]>([]);
    const { user } = useAuth();
    const navigate = useNavigate();
    const { orderId } = useParams();

    useEffect(() => {
        if (orderId) {
            // אם קיים orderId, שלוף רק את ההזמנה הספציפית
            orderService.getOrderByOrderId(orderId)
                .then(res => setOrder(res.data))
                .catch(err => console.log(err));
        } else if (user) {
            // אם אין orderId, שלוף את כל ההזמנות
            orderService.getOrdersByUser(user._id)
                .then(res => setOrders(res.data))
                .catch(err => console.log(err));
        }
    }, [user, orderId]);

    const handleCancelOrder = async (event: React.MouseEvent<HTMLAnchorElement>, orderId: string) => {
        event.preventDefault();
        const result = await dialogs.confirm("Cancel Order", "Are you sure you want to cancel the order?");
        if (result.isConfirmed) {
            try {
                const response = await orderService.cancelOrder(orderId);
                console.log('Order cancelled:', response.data);
                dialogs.success("Order Cancelled", "Your order has been cancelled successfully.");

                setTimeout(() => {
                    navigate('/');
                }, 1500);

            } catch (error) {
                console.error('Error cancelling order:', error);
                dialogs.error("Error", "Failed to cancel the order.");
            }
        }
    }

    if (orderId && !order) {
        return (
            <div className="order-confirmation-page">
                <h2 className="order-title">Loading the order details...</h2>
            </div>
        );
    }


    if (!user && !order) {
        return (
            <div className="order-confirmation-page">
                <h2 className="order-title">Please login to view your order</h2>
            </div>
        );
    }

    if (order) {
        return (
            <div className="order-confirmation-page">
                <h1 className="order-title">Order Confirmation</h1>
                <div className="order-details-container">
                    <h2 className="order-title">Order #{order._id}</h2>
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
                            {user?.isAdmin ? (
                                <Link to="#" onClick={(event) => handleCancelOrder(event, order._id)} className="cancel-order-link text-red-500 hover:underline">
                                    <Tooltip
                                        content="Cancel Order"
                                        placement="top"
                                        className="text-sm bg-gray-800 text-white rounded px-2 py-1"
                                    >
                                        <FiX className="inline-block mr-2 text-4xl" />
                                    </Tooltip>
                                </Link>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="empty-orders-page flex flex-col items-center justify-center">
                <h2 className="text-2xl font-semibold mb-4">Your orders list is empty</h2>
                <p className="text-lg mb-4">Should we start shopping?</p>
                <Link to="/" className="back-to-shopping text-blue-800 hover:underline flex items-center">
                    <FiArrowLeft className="mr-2" />
                    Back to Shopping
                </Link>
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
                            {user?.isAdmin && order.status !== 'cancelled' ? (
                                <Link to="#" onClick={(event) => handleCancelOrder(event, order._id)} className="cancel-order-link text-red-500 hover:underline">
                                    <Tooltip
                                        content="Cancel Order"
                                        placement="top"
                                        className="text-sm bg-gray-800 text-white rounded px-2 py-1"
                                    >
                                        <FiX className="inline-block mr-2 text-4xl" />
                                    </Tooltip>
                                </Link>
                            ) : (order.status === 'cancelled' ? (
                                <div className="order-cancelled-note text-red-500 mt-4">
                                    <span>Cancelled Order</span>
                                </div>
                            ) : null)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderConfirmation;