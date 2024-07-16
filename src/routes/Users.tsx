import { useEffect, useState } from 'react';
import { deleteUserById, getAllUsers } from '../services/auth';
import { IUser } from '../@Types/types';
import { Table } from 'flowbite-react';
import dialogs from '../ui/dialogs';
import { FiTrash2 } from 'react-icons/fi';

const Users = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        getAllUsers()
            .then(res => setUsers(res.data))
            .catch(err => setError(err));
    }, []);

    const handleDelete = (id: string) => {
        dialogs.confirm("Are you sure?", "Do you want to delete this user?")
            .then((result) => {
                if (result.isConfirmed) {
                    deleteUserById(id)
                        .then(() => {
                            setUsers(users.filter(user => user._id !== id));
                            dialogs.success("Success", "User deleted successfully");
                        })
                        .catch(err => setError(err));
                }
            });
    };

    if (error) return <div>Error: {error.message}</div>;


    return (
        <div className="overflow-x-auto">
            <h2 className='text-5xl font-extralight text-center mb-10'>Users</h2>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>User Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Phone</Table.HeadCell>
                    <Table.HeadCell>Address</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {users.map((user) => (
                        <Table.Row key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {user.name.first} {user.name.last}
                            </Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell>{user.phone}</Table.Cell>
                            <Table.Cell>{user.address.city}, {user.address.street}</Table.Cell>
                            <Table.Cell>
                                
                                <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:text-red-800">
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

export default Users;