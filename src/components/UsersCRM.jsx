import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

function UsersCRM({sessionToken}) {
    let [serverUsers, setServerUsers] = useState([]);
    // let [usersChanged, setUsersChanged] = useState(false);
    // setUsersChanged(!usersChanged); 

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("x-auth-token", sessionToken);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setServerUsers(result);
            })
            .catch((error) => console.error(error));
    }, []);

    return ( <div>
        
        <h2>Users CRM Table</h2>
        <div className="table-container">

            <table style={{ border: "2px solid purple" }}>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>Phone</th>
                        <th>User Type</th>
                        <th colSpan="3">Controls:</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        serverUsers.length ? (
                            serverUsers.map((user, index) => (
                            index <= 25 ? (
                                <tr key={user._id} >
                                    <td >{user._id}</td>
                                    <td>{user.name.first} {user.name.last}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>Admin = {user.isAdmin.toString()} | Biz = {user.isBusiness.toString()}</td>
                                        
                                        <td>
                                            <Link to={`user/${user._id}`} >View User</Link>
                                        </td>
                                        <td>
                                            <Link to={`user/${user._id}`} >Edit</Link>
                                        </td>
                                        <td>
                                            <Link to={`user/${user._id}`} >Delete</Link>
                                        </td>
                                        
                                </tr>
                                ) : null 
                            ))
                        ) : (
                            <tr>
                                <td>No Data..</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    </div> );
}

export default UsersCRM;