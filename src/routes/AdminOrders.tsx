
import './AdminOrders.scss';
import { Table } from 'flowbite-react';
import { useEffect, useState, MouseEvent } from 'react';
import { IOrder } from '../@Types/productType';
import dialogs from '../ui/dialogs';
import { useSearch } from '../hooks/useSearch';
import { getAllOrders, updateOrderStatus } from '../services/analytics';
import orderService from '../services/order';
import { FiTrash2 } from 'react-icons/fi';

const statusOptions = [
    "pending", "approved", "processing", "shipped", "delivered", "cancelled", "returned", "completed"
];

const AdminOrders = () => {
    const { searchTerm } = useSearch();
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        getAllOrders()
            .then(res => {
                if (res.data && Array.isArray(res.data.orders)) {
                    setOrders(res.data.orders);
                    setFilteredOrders(res.data.orders);
                } else {
                    setError(new Error("Unexpected response format"));
                }
            })
            .catch(err => setError(err));
    }, []);

    useEffect(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        setFilteredOrders(
            orders.filter(order =>
                order.orderNumber.toLowerCase().includes(lowercasedSearchTerm)
            )
        );
    }, [searchTerm, orders]);

    const handleStatusChange = (orderId: string, status: string) => {
        updateOrderStatus(orderId, status)
            .then(() => {
                setOrders(orders.map(order =>
                    order.orderId === orderId ? { ...order, status } : order
                ));
                dialogs.success("Success", "Order status updated successfully.");
            })
            .catch(err => setError(err));
    };

    const handleCancelOrder = async (event: MouseEvent<HTMLButtonElement>, orderId: string) => {
        event.preventDefault();
        const result = await dialogs.confirm("Cancel Order", "Are you sure you want to cancel the order?");
        if (result.isConfirmed) {
            try {
                const response = await orderService.cancelOrder(orderId);
                console.log('Order cancelled:', response);
                dialogs.success("Order Cancelled", "Your order has been cancelled successfully.");

                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } catch (error) {
                console.error('Error cancelling order:', error);
                dialogs.error("Error", "Failed to cancel the order.");
            }
        }
    };

    return (
        <div className="admin-orders-container">
            <h2 className='text-4xl text-gray-800 mb-7 text-center mt-2'>Orders</h2>
            {error && <div className="text-red-500 text-center mb-4">{error.message}</div>}
            <Table hoverable className="hidden md:table">
                <Table.Head>
                    <Table.HeadCell>Order Number</Table.HeadCell>
                    <Table.HeadCell>User ID</Table.HeadCell>
                    <Table.HeadCell>Total Amount</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Date</Table.HeadCell>
                    <Table.HeadCell>Products</Table.HeadCell>
                    <Table.HeadCell>Action</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {filteredOrders.map((order) => (
                        <Table.Row key={order.orderId} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>{order.orderNumber}</Table.Cell>
                            <Table.Cell>{order.userId}</Table.Cell>
                            <Table.Cell>${order.totalAmount.toFixed(2)}</Table.Cell>
                            <Table.Cell>
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                                    className="border rounded px-2 py-1"
                                >
                                    {statusOptions.map(status => (
                                        <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                                    ))}
                                </select>
                            </Table.Cell>
                            <Table.Cell>{new Date(order.createdAt).toLocaleDateString()}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap w-1/3">
                                <div className="flex flex-wrap space-x-2">
                                    {order.products.map((product, index) => (
                                        <div key={index} className="bg-gray-100 dark:bg-gray-700 p-2 rounded mb-2">
                                            <p className="text-sm">Title: {product.title}</p>
                                            <p className="text-sm">Size: {product.size}</p>
                                            <p className="text-sm">Quantity: {product.quantity}</p>
                                            <p className="text-sm">Price: ${product.price}</p>
                                        </div>
                                    ))}
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <button onClick={(event) => handleCancelOrder(event, order.orderId)} className="text-red-600 hover:text-red-800">
                                    <FiTrash2 size={20} />
                                </button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            {/* Mobile View */}
            <div className="grid md:hidden gap-4">
                {filteredOrders.map((order) => (
                    <div key={order.orderId} className="bg-white dark:border-gray-700 dark:bg-gray-800 p-4 rounded-lg shadow-md">
                        <div className="flex flex-col mb-4">
                            <p className="font-medium text-gray-900 dark:text-white">Order Number: {order.orderNumber}</p>
                            <p className="font-medium text-gray-900 dark:text-white">User ID: {order.userId}</p>
                            <p className="font-medium text-gray-900 dark:text-white">Total Amount: ${order.totalAmount.toFixed(2)}</p>
                            <p className="font-medium text-gray-900 dark:text-white">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                            <div className="mt-2">
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                                    className="border rounded px-2 py-1 w-full"
                                >
                                    {statusOptions.map(status => (
                                        <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mb-4">
                            {order.products.map((product, index) => (
                                <div key={index} className="bg-gray-100 dark:bg-gray-700 p-2 rounded mb-2">
                                    <p className="text-sm text-gray-900 dark:text-white">Title: {product.title}</p>
                                    <p className="text-sm text-gray-900 dark:text-white">Size: {product.size}</p>
                                    <p className="text-sm text-gray-900 dark:text-white">Quantity: {product.quantity}</p>
                                    <p className="text-sm text-gray-900 dark:text-white">Price: ${product.price}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center">
                            <button onClick={(event) => handleCancelOrder(event, order.orderId)} className="text-red-600 hover:text-red-800">
                                <FiTrash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminOrders;
