import { useContext } from "react";
import { siteTheme } from "../App";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Footer({developer}) {
    const theme = useContext(siteTheme);
    const user = useSelector((state) => state.user);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return ( <> 
        <div style={{ display: "flex", justifyContent:"space-between", alignItems:"center", fontSize: ".8rem", textAlign: "left", width: "99.9%", height:"30px", position: "fixed", bottom: "0px", left: "0px", background: "black", padding: ".5em", backgroundColor: theme.background, color: theme.color }}>
            <p>Developed by: {developer}</p> 
            
            <div className="footer-links" style={{display:"flex", gap:"1em", marginRight:"10px"}}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>

                {(user.user._id) && (
                    <NavLink to="/liked-cards">Liked Cards</NavLink>
                )}
                {user.user.isBusiness && (<>
                    <NavLink to="/business/user">My Cards</NavLink>
                    <NavLink to="/business/add-business">Add Card</NavLink>
                </>)}
                {user.user.isAdmin && (
                    <NavLink to="/sandbox-crm">Sandbox CRM</NavLink>
                )}
            </div>
        
            <button onClick={scrollToTop} style={{ position: "absolute", bottom: "45px", right: "15px", padding: "8px", backgroundColor: theme.background, color: theme.color, borderRadius: "10px", border:"1px solid green"}}>
                Scroll to Top
            </button>
        </div>
    </> );
}
export default Footer;