import { Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSearch } from '../hooks/useSearch';
import { IMessage } from '../@Types/types';
import { getAllMessages } from '../services/message-service';

const AdminMessages = () => {
    const { searchTerm } = useSearch();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [filteredMessages, setFilteredMessages] = useState<IMessage[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllMessages()
            .then(data => {
                console.log('Messages fetched:', data); // הדפס את התגובה כאן
                if (Array.isArray(data)) {
                    setMessages(data);
                    setFilteredMessages(data);
                } else {
                    setError(new Error("Unexpected response format"));
                }
            })
            .catch(err => {
                console.error('Fetch error:', err);
                setError(err);
            })
            .finally(() => setLoading(false));
    }, []);


    useEffect(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        setFilteredMessages(
            messages.filter(message =>
                message.message.toLowerCase().includes(lowercasedSearchTerm) ||
                message.fullName.toLowerCase().includes(lowercasedSearchTerm) ||
                message.email.toLowerCase().includes(lowercasedSearchTerm)
            )
        );
    }, [searchTerm, messages]);

    return (
        <div className="overflow-x-auto bg-white dark:border-gray-700 dark:bg-gray-800">
            <h2 className='text-4xl text-gray-800 mb-7 text-center mt-7'>Messages</h2>

            {loading && <div className="text-center">Loading...</div>}
            {error && <div className="text-red-500 text-center mb-4">{error.message}</div>}
            {!loading && filteredMessages.length === 0 && <div className="text-center">No messages found.</div>}

            <div className="hidden lg:block">  {/* תצוגה לדסקטופ */}
                {!loading && filteredMessages.length > 0 && (
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Full Name</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Message</Table.HeadCell>
                            <Table.HeadCell>Created At</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {filteredMessages.map((message) => (
                                <Table.Row key={message._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>{message.fullName}</Table.Cell>
                                    <Table.Cell>{message.email}</Table.Cell>
                                    <Table.Cell>{message.message}</Table.Cell>
                                    <Table.Cell>{new Date(message.createdAt).toLocaleDateString()}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                )}
            </div>

            <div className="block lg:hidden">  {/* תצוגה למובייל */}
                {filteredMessages.map((message) => (
                    <div key={message._id} className="message-card p-4 mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <div className="font-medium text-gray-900 dark:text-white mb-2">
                            {message.fullName}
                        </div>
                        <div className="text-gray-700 dark:text-gray-300">{message.email}</div>
                        <div className="text-gray-700 dark:text-gray-300">{message.message}</div>
                        <div className="text-gray-700 dark:text-gray-300">{new Date(message.createdAt).toLocaleDateString()}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminMessages;