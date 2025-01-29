import { useState } from "react";
import { useParams } from "react-router-dom";

function UserPage({user, setUser}) {

    let urlParams = useParams();
   /*  let [user, setUser] = useState({}); */
    
    // Move to Edit User Component: // 
    setUser({ name: { first: "dudeEdited", last: "sir" }});
    
    return (<>

        <h4>This is a user page for: {urlParams.id}!</h4>
        <p>sup {user.name.first} {user.name.last}</p>


    </>);
}

export default UserPage;