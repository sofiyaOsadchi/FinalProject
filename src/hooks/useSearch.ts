import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
};