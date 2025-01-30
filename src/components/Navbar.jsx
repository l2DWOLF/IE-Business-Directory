import { NavLink, useNavigate } from "react-router-dom";
import "./css/navbar.css";
import SearchBar from "./SearchBar";
import { useContext, useState } from "react";
import { siteTheme } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { Signoff } from "../redux/UserState";
import { Menu, X } from "lucide-react"; // Hamburger and close icons
import { infoMsg } from "../services/feedbackService";

function Navbar(props) {
    let navit = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const theme = useContext(siteTheme);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const logoutBtn = () => {
        dispatch(Signoff());
        infoMsg('Youre now logged out, see you soon!');
        setTimeout(() => navit("/"), 1000);
    };

    return (
        <div className="navbar">
            <div className="logo">
                <NavLink to="/">IE Directory</NavLink>
            </div>

            <div className={`site-nav ${isMobileMenuOpen ? "active" : ""}`}>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">About</NavLink>
                    </li>

                    {(user.user._id) && (
                        <>
                            <li>
                                <NavLink to="/saved-cards">Liked Cards</NavLink>
                            </li>
                        </>
                    )}
                    {user.user.isBusiness && (
                        <>
                            <li>
                                <NavLink to="/business/user">My Cards</NavLink>
                            </li>
                            <li>
                                <NavLink to="/business/add-business">Add Card</NavLink>
                            </li>
                            
                        </>
                    )}
                    {user.user.isAdmin && (
                        <>
                            <li>
                                <NavLink to="/sandbox-crm">Sandbox CRM</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            <div className="search-bar">
                <SearchBar />
            </div>

            <div className="user-nav">
                {user.token === "" ? (
                    <>
                        <NavLink to="/register">Register</NavLink>
                        <NavLink to="/login">Login</NavLink>
                    </>
                ) : (
                    <div style={{ display: "flex", gap: "1em" }}>
                        <button onClick={logoutBtn}>LOGOUT</button>

                        <div className="user-img">
                            <p>{props.userName}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Hamburger Icon */}
            <div className="hamburger" onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </div>
        </div>
    );
}

export default Navbar;
