import { useEffect, useState } from "react";


function SearchBar() {

    let [userQuery, setUserQuery] = useState("");

    const inputHandler = (query) => {
        console.log("Query: " + query);
        setUserQuery(query);
    };

    useEffect(() => {
        console.log("Query Updated to: " + userQuery);
    }, [userQuery]);
    

    return ( <div style={{border:"1px solid green", background:"grey"}}>
        <label htmlFor="searchInput">Search:</label>
        <input type="text" 
        id="searchInput"
        onChange={(e) => {inputHandler(e.target.value)}}
        />

        <p style={{border:"1px solid pink", padding: ".2em"}}>Query: {userQuery}</p>
    </div> );
};

export default SearchBar;