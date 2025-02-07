import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

function Greeting() {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    return (<div style={{border:"1px solid gold", padding:".5em", borderRadius:"15px", display:"flex", flexDirection:"column", gap:".5em", flexWrap:"wrap", maxWidth:"80%"}}>
    {user.user.isAdmin && !user.user.isBusiness && <>
            <h4>Welcome Back! </h4>
            <p>Your Admin Permissions allows you to like cards and view the Sandbox/CRM Page.</p>
            <div className="greeting-btns" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: ".3em" }}>
            <NavLink to="/liked-cards"> <button>Liked Cards</button> </NavLink>
            <NavLink to="/sandbox-crm"> <button>Sandbox CRM</button> </NavLink> 
            </div>
        </>
    }

    {user.user.isBusiness && user.user.isAdmin && <>
        <h4>Welcome Back !</h4>
        <p>Your Admin & Business Permissions allows you to view Sandbox/CRM Page, Create/Edit/Delete/Like Business Cards.</p>
            <div className="greeting-btns" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: ".3em", flexWrap: "wrap" }}>
                <NavLink to="/liked-cards"> <button>Liked Cards</button> </NavLink>
                <NavLink to="/business/user"> <button>My Cards</button> </NavLink>
                <NavLink to="/business/add-business"> <button>Add Business</button> </NavLink>
                <NavLink to="/sandbox-crm"> <button>Sandbox CRM</button> </NavLink>
        </div>
    </>}

    {user.user.isBusiness && !user.user.isAdmin && <>
        <h4>Welcome Back !</h4>
        <p>Your Business Permissions allows you to, Create/Edit/Delete/Like Business Cards.</p>
            <div className="greeting-btns" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: ".3em", flexWrap: "wrap" }}>
                <NavLink to="/liked-cards"> <button>Liked Cards</button> </NavLink>
                <NavLink to="/business/user"> <button>My Cards</button> </NavLink>
                <NavLink to="/business/add-business"> <button>Add Business</button> </NavLink>
            </div>
    </>}

    {user.user._id != "" && !user.user.isBusiness && !user.user.isAdmin && <>
        <h4>Welcome Back!</h4>
            <p>Your Regular User Permissions allows you to Like and Save Business Cards to Your Liked Cards Page.</p>
            <div className="greeting-btns" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: ".3em", flexWrap: "wrap" }}>
                <NavLink to="/liked-cards"> <button>Liked Cards</button> </NavLink>
            </div>
    </>}

    {user.user._id == "" && <>
            <h4>Login or Register to Like or Add your Business Cards to our Directory.</h4>
            <div className="greeting-btns" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: ".3em", flexWrap: "wrap" }}>
                <NavLink to="/login"> <button>Login</button> </NavLink>
                <NavLink to="/register"> <button>Register</button> </NavLink>
            </div>
    </>}
    </div> );
}
export default Greeting;