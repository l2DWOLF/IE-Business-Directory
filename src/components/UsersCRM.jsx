import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { siteTheme } from "../App";
import { warningMsg } from "../services/feedbackService";
import { getAllUsers } from "../services/userServices";

function UsersCRM() {
    const api = import.meta.env.VITE_API;
    const theme = useContext(siteTheme);
    let [serverUsers, setServerUsers] = useState([]);
    const user = useSelector((state) => state.user);
    const navit = useNavigate();
    const [usersDisplay, setUsersDisplay] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        if (!user.user?.isAdmin) {
            warningMsg("You're Not Authorized to view this page :)");
            navit("/");
        }
    }, [user]);

    useEffect(() => {
        const fetchCrm = async () => {
            try{
                const res = await getAllUsers(user.token)
                setServerUsers(res.data)
                setUsersDisplay(res.data.slice(0, 25))
            } catch (e) {
                console.error(e)
                warningMsg(e)
            }
        }
    fetchCrm()
    }, []);

    const loadMoreUsers = () => {
        const nextPage = page + 1;
        const nextUsers = serverUsers.slice(nextPage * 25, (nextPage + 1) * 25);
        setUsersDisplay((prev) => [...prev, ...nextUsers]);
        setPage(nextPage);
    };

    return (<div style={{ backgroundColor: theme.background, color: theme.color, padding: "1em" }}>

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
                        usersDisplay.length ? (
                            usersDisplay.map((user) => (
                                <tr key={user._id} >
                                    <td >{user?._id}</td>
                                    <td>{user?.name?.first} {user?.name?.last}</td>
                                    <td>{user?.email}</td>
                                    <td>{user?.phone}</td>
                                    <td>Admin = {user?.isAdmin?.toString() || "false"} | Biz = {user?.isBusiness?.toString()}</td>

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
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" style={{ textAlign:"center"}}>
                                    Loading / No Data..</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <button onClick={loadMoreUsers}
                style={{ width: "50%", alignSelf: "center" }}>Load More Users</button>
        </div>
    </div>);
}
export default UsersCRM;