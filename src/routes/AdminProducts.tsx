import React, { useEffect, useState } from 'react';
import { deleteProductById, getAllProducts } from '../services/product'; // ודא שהפונקציה הזו קיימת בשירות המוצרים
import { IProduct } from '../@Types/productType';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import dialogs from '../ui/dialogs';
import { FiTrash2 } from 'react-icons/fi';

const AdminProducts = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        getAllProducts()
            .then(res => setProducts(res.data))
            .catch(err => setError(err));
    }, []);

    const onDelete = (id: string) => {
        dialogs.confirm("Are you sure?", "Do you want to delete this product?")
            .then((result) => {
                if (result.isConfirmed) {
                    deleteProductById(id)
                        .then(() => {
                            setProducts(products.filter(product => product._id !== id));
                            dialogs.success("Deleted!", "The product has been deleted.");
                        })
                        .catch(err => setError(err));
                }
            })
            .catch(err => setError(err));
    };

    return (
        <div className="overflow-x-auto">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Title</Table.HeadCell>
                    <Table.HeadCell>Subtitle</Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                    <Table.HeadCell>Price</Table.HeadCell>
                    <Table.HeadCell>Size</Table.HeadCell>
                    <Table.HeadCell>Quantity</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {products.map((product) => (
                        <Table.Row key={product._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {product.title}
                            </Table.Cell>
                            <Table.Cell>{product.subtitle}</Table.Cell>
                            <Table.Cell>{product.description}</Table.Cell>
                            <Table.Cell>{product.price}</Table.Cell>
                            <Table.Cell>{product.size}</Table.Cell>
                            <Table.Cell>{product.quantity}</Table.Cell>
                            <Table.Cell>
                                <Link to={`/admin/products/${product._id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                    Edit
                                </Link>
                            </Table.Cell>
                            <Table.Cell>
                                <button onClick={() => onDelete(product._id)} className="text-red-600 hover:text-red-800">
                                    <FiTrash2 size={20} />
                                </button>
                                
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}

export default AdminProducts;