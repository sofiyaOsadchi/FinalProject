import { useEffect, useState } from 'react';
import { deleteProductById, getAllProducts } from '../services/product';
import { IProduct } from '../@Types/productType';
import { Table, Tooltip } from 'flowbite-react';
import { Link } from 'react-router-dom';
import dialogs from '../ui/dialogs';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useSearch } from '../hooks/useSearch';
import './AdminProducts.scss';

const AdminProducts = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const { searchTerm } = useSearch();

    useEffect(() => {
        getAllProducts()
            .then(res => setProducts(res.data))
            .catch(err => setError(err));
    }, []);

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        <div className="admin-products-container">
            <h2 className='text-4xl text-gray-800 mb-4 text-center'>Products</h2>
            <div className="admin-products-add-button mb-4 flex justify-end">
                <Tooltip content="Add Product" placement="top" className="text-sm bg-gray-800 text-white rounded px-2 py-1">
                    <Link to="/admin/create-product" className="text-white bg-[#c37d69] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-3 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <FiPlus size={20} />
                        <span className="sr-only">Add Product</span>
                    </Link>
                </Tooltip>
            </div>
            {error && <div className="text-red-500 text-center mb-4">{error.message}</div>}
            <Table hoverable className="hidden md:table">
                <Table.Head>
                    <Table.HeadCell>Image $ Title</Table.HeadCell>
                    <Table.HeadCell>Variant</Table.HeadCell>
                    <Table.HeadCell>Total Quantity</Table.HeadCell>
                    <Table.HeadCell>Edit</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {filteredProducts.map((product) => (
                        <Table.Row key={product._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex items-center">
                                <img src={product.image.url} alt={product.alt} className="h-12 w-12 object-cover rounded-full mr-4" />
                                <div className="flex flex-col">
                                    <span>{product.title}</span>
                                </div>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap">
                                <div className="flex flex-wrap gap-2">
                                    {product.variants.map((variant, index) => (
                                        <div key={index} className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                                            <p className="text-sm">Size: {variant.size}</p>
                                            <p className="text-sm">Price: ${variant.price}</p>
                                            <p className="text-sm">Quantity: {variant.quantity}</p>
                                        </div>
                                    ))}
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                {product.variants.reduce((total, variant) => total + variant.quantity, 0)}
                            </Table.Cell>
                            <Table.Cell>
                                <div className="table-actions">
                                    <Link to={`/admin/products/${product._id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        Edit
                                    </Link>
                                    <button onClick={() => onDelete(product._id)} className="text-red-600 hover:text-red-800">
                                        <FiTrash2 size={20} />
                                    </button>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            {/* Mobile View */}
            <div className="grid md:hidden gap-4">
                {filteredProducts.map((product) => (
                    <div key={product._id} className="bg-white dark:border-gray-700 dark:bg-gray-800 p-4 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <img src={product.image.url} alt={product.alt} className="h-12 w-12 object-cover rounded-full mr-4" />
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">{product.title}</p>
                            </div>
                        </div>
                        <div className="mb-4">
                            {product.variants.map((variant, index) => (
                                <div key={index} className="bg-gray-100 dark:bg-gray-700 p-2 rounded mb-2">
                                    <p className="text-sm">Size: {variant.size}</p>
                                    <p className="text-sm">Price: ${variant.price}</p>
                                    <p className="text-sm">Quantity: {variant.quantity}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center">
                            <Link to={`/admin/products/${product._id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                Edit
                            </Link>
                            <button onClick={() => onDelete(product._id)} className="text-red-600 hover:text-red-800">
                                <FiTrash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminProducts;
