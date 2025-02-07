import './css/userpage.css'
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { siteTheme } from "../App";
import { useSelector } from "react-redux";
import { getOneUser } from "../services/userServices";
import { Edit3, Phone, Trash2 } from "lucide-react";
import { infoMsg, warningMsg } from '../services/feedbackService';

function UserPage() {
    const theme = useContext(siteTheme);
    const user = useSelector((state) => state.user);
    let navit = useNavigate();
    let [userCard, setUserCard] = useState({});
    let urlParams = useParams();

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
                <p>Address: {userCard.address?.houseNumber} {userCard.address?.street}, {userCard.address?.city}, {userCard.address?.state}, {userCard.address?.country}, {userCard.address?.zip}.</p>
            </div>
            <div className="card-ctrls">
                <hr />
                <div className="card-btns">
                    <a href={`tel:${user.phone}`} title={`Call Business: ${user.phone}`}>
                        <button>
                            <Phone className="card-icons" />
                        </button>
                    </a>
                    {(user.user.isAdmin == true|| user.user._id == urlParams.id) && (
                        <>
                            <button title="Edit this card" onClick={() => infoMsg('Edit Function Coming Soon..')}>
                                <Edit3 className="card-icons" />
                            </button>
                            <button title="Delete this card" onClick={() => infoMsg('Delete Function Coming Soon..')}>
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