import { useContext } from "react";
import { searchContext } from "../App";

function SearchBar() {
    const { searchQuery, setSearchQuery } = useContext(searchContext);

    return (
        <div>
            <input
                id="search-bar"
                type="text"
                placeholder="Search Business Cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
}
export default SearchBar;