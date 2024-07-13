import { useEffect, useState } from 'react';
import { getAllUsers } from '../services/auth';
import { IUser } from '../@Types/types';
import { Card, TabItem, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        getAllUsers()
            .then(res => setUsers(res.data))
            .catch(err => setError(err));
    }, []);

    return (
        <div className="overflow-x-auto">
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
                                <Link to={`/users/${user._id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                    Edit
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}

export default Users;