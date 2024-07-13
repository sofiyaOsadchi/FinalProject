
import { Stack, TextField } from "@mui/material";
import { useSearch } from "../hooks/useSearch";
import "./Search.scss";

const Search = () => {
    const { setSearchTerm } = useSearch();
    return (
        <Stack className="search-container">
            <TextField
                className="search-input dark:bg-gray-700 dark:text-white"
                onChange={(e) => {
                    setSearchTerm(e.currentTarget.value);
                }}
                variant="outlined"
                label="Search"
                required

                InputProps={{
                    style: {
                        color: 'white',
                        borderColor: 'white'
                    }
                }}
                InputLabelProps={{
                    style: { color: 'white' }
                }}
            />
        </Stack>
    );
};

export default Search;