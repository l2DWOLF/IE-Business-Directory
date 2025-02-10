import './css/userpage.css'
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { siteTheme } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getOneUser } from "../services/userServices";
import { Edit3, Phone, Trash2 } from "lucide-react";
import { errorMsg, infoMsg, successMsg, warningMsg } from '../services/feedbackService';
import { Signoff } from '../redux/UserState';

function UserPage() {
    const theme = useContext(siteTheme);
    const user = useSelector((state) => state.user);
    const navit = useNavigate();
    let [userCard, setUserCard] = useState({});
    let urlParams = useParams();
    const dispatch = useDispatch();

    //Page Permissions//
    useEffect(() => {
        if (!user?.user || (!user.user?.isAdmin && user.user?._id !== urlParams.id)) {         
            warningMsg("You're Not Authorized to view this Page :)");
            navit("/");
    }
    }, [user, urlParams.id, navit]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getOneUser(urlParams.id, user.token)
                setUserCard(res.data);
            } catch (error) {
                console.log(error);
            }
        }
    fetchUser();
    }, []); 

    const handleUserDelete = async () => {
        if(userCard.isAdmin)
        {
            warningMsg("Admin Users Cannot be Deleted..");
        }
        else
        {
            let confirmed = confirm("Are you Sure you want to delete this User? it will be permanently Deleted..");
            if (confirmed) {
                try {
                    const res = await deleteUser(urlParams.id, user.token);
                    successMsg("User was Deleted Successfully");
                    if(urlParams.id == user.user._id)
                    {
                        dispatch(Signoff());
                        infoMsg('Redirecting to Homepage');
                        setTimeout(() => navit("/"), 1000);
                    }
                    else {navit(-1); infoMsg('Redirecting to CRM Page')}
                } catch (error) {
                    errorMsg(error);
                    console.log(error);
                }
            }
        }
    }

    return (<div className="user-page-container" style={{ background: theme.background, color: theme.color }}>
        <h2>{userCard.name?.first} {userCard.name?.last}'s User Page.</h2>
        <p>View, Edit or Delete User</p>

        <div className="user-card" style={{ background: theme.background, color: theme.color, width:"50%"}}>

            <img className="bus-image" src={userCard.image?.url} alt={userCard.image?.alt} style={{width:"175px", alignSelf:"center"}} />
            <h3>{userCard.name?.first} {userCard.name?.last}</h3>
            <hr />
                <div className="a">
                {!userCard.isAdmin && !userCard.isBusiness && <p>{userCard.name?.first} is a Regular User.</p>}
                {userCard.isBusiness && <p>{userCard.name?.first} is a Business User.</p>}
                {userCard.isAdmin && <p>{userCard.name?.first} is an Admin User.</p>}
                <p>Member Since: {userCard.createdAt}</p>
                </div>
            <hr />
            <div className="business-info">
                <p>User ID: {userCard._id}.</p>
                <p>Phone: {userCard.phone}</p>
                <p>Email: {userCard.email}</p>
                <p>Address: {userCard.address?.houseNumber} {userCard.address?.street}, {userCard.address?.city}, {userCard.address?.state !== "not defined" && userCard.address?.state}, {userCard.address?.country}, {userCard.address?.zip}.</p>
            </div>
            <div className="card-ctrls">
                <hr />
                <div className="card-btns">
                    <a href={`tel:${user.phone}`} title={`Call Business: ${user.phone}`}>
                        <button>
                            <Phone className="card-icons" />
                        </button>
                    </a>
                    {(user.user.isAdmin == true || user.user._id == urlParams.id) && (
                        <>
                            <button title="Edit this card" onClick={() => infoMsg('Edit Function Coming Soon..')}>
                                <Edit3 className="card-icons" />
                            </button>
                            <button title="Delete this card" onClick={handleUserDelete}>
                                <Trash2 className="card-icons" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    </div>);
}
export default UserPage;