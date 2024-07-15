import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useSearch } from '../hooks/useSearch';

const Search = () => {
    const { setSearchTerm } = useSearch();
    const [isOpen, setIsOpen] = useState(false);

    const handleButtonClick = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <div className="relative flex items-center">
            <button
                onClick={handleButtonClick}
                className="absolute right-0 h-6 w-6 rounded-lg flex items-center justify-center"
            >
                <FiSearch className="dark:text-white" />
            </button>
            <input
                onChange={(e) => setSearchTerm(e.currentTarget.value)}
                type="search"
                className={`text-xs h-8 ${isOpen ? 'w-32 pr-6' : 'w-0 pr-0'} rounded-lg border bg-transparent outline-none focus:w-48 transition-all duration-300 ease-in-out`}
                placeholder="Search"
                style={{ marginRight: isOpen ? '2rem' : '0', visibility: isOpen ? 'visible' : 'hidden', opacity: isOpen ? 1 : 0 }}
            />
        </div>
    );
};

export default Search;
