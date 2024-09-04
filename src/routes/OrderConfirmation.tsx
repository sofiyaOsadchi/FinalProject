import { useEffect, useState, MouseEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import orderService from '../services/order';
import { IOrder } from '../@Types/productType';
import './OrderConfirmation.scss';
import { useAuth } from '../hooks/useAuth';
import { FiX } from 'react-icons/fi';
import dialogs from '../ui/dialogs';
import { Tooltip } from 'flowbite-react';

declare global {
    interface Window {
        dataLayer: any[];
    }
}

const OrderConfirmation = () => {
    const [order, setOrder] = useState<IOrder | null>(null);
    const { user } = useAuth();
    const { orderId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                if (orderId) {
                    const res = await orderService.getOrderByOrderId(orderId);
                    setOrder(res.data);

                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        event: 'purchase',
                        transactionId: res.data.orderNumber,
                        purchaseValue: res.data.totalAmount,
                        currencyCode: 'USD', 
                        items: res.data.products.map(product => ({
                            item_name: product.title,
                            item_id: product.productId,
                            price: product.price,
                            quantity: product.quantity
                        }))
                    });
                }
            } catch (err) {
                console.error('Error fetching order:', err);
            }
        };

        fetchOrder();
    }, [orderId]);

    const handleCancelOrder = async (event: MouseEvent<HTMLAnchorElement>, orderId: string) => {
        event.preventDefault();
        const result = await dialogs.confirm("Cancel Order", "Are you sure you want to cancel the order?");
        if (result.isConfirmed) {
            try {
                const response = await orderService.cancelOrder(orderId);
                console.log('Order cancelled:', response);
                dialogs.success("Order Cancelled", "Your order has been cancelled successfully.");

                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } catch (error) {
                console.error('Error cancelling order:', error);
                dialogs.error("Error", "Failed to cancel the order.");
            }
        }
    };

    if (!order) {
        return (
            <div className="order-confirmation-page">
                <h2 className="order-title">Loading the order details...</h2>
            </div>
        );
    }

    return (
        <div className="order-confirmation-page">
            <h1 className="order-title">Order Confirmation</h1>
            <div className="order-details-container">
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
};

export default OrderConfirmation;
