import { Table} from 'flowbite-react';
import { useEffect, useState } from 'react';
import { IOrder } from '../@Types/productType';
import dialogs from '../ui/dialogs';
import { useSearch } from '../hooks/useSearch';
import { getAllOrders, updateOrderStatus } from '../services/analytics';


const statusOptions = [
    "pending", "approved", "processing", "shipped", "delivered", "cancelled", "returned", "completed"
];

const AdminOrders = () => {
    const { searchTerm, setSearchTerm } = useSearch();
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

      return (
        <div className="overflow-x-auto bg-white dark:border-gray-700 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className='text-5xl font-extralight text-center mb-6'>Orders</h2>
            {error && <div className="text-red-500 text-center mb-4">{error.message}
                </div>}
                
              <Table hoverable className='"overflow-x-auto'>
                <Table.Head>
                    <Table.HeadCell>Order Number</Table.HeadCell>
                    <Table.HeadCell>User ID</Table.HeadCell>
                    <Table.HeadCell>Total Amount</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Created At</Table.HeadCell>
                    <Table.HeadCell>Products</Table.HeadCell>
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
                            <Table.Cell className="whitespace-nowrap w-1/3"> {/* הוספתי מחלקת w-1/3 להרחבת העמודה */}
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
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}

export default AdminOrders;