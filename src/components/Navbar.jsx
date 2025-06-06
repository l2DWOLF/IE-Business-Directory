import { NavLink, useNavigate } from "react-router-dom";
import "./css/navbar.css";
import "./css/navbar-mobile.css"
import SearchBar from "./SearchBar";
import { useContext, useState } from "react";
import { searchContext, siteTheme } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { Signoff } from "../redux/UserState";
import { SetApiBase } from "../redux/ApiState";
import { Menu, X, SquareUserRound, Sun, Moon } from "lucide-react";
import { infoMsg } from "../services/feedbackService";
const campusApi = import.meta.env.VITE_CAMPUS_API;
const myApi = import.meta.env.VITE_IE_API;

function Navbar({darkMode, toggleTheme}) {
    let navit = useNavigate();
    const dispatch = useDispatch();
    const apiBase = useSelector((state) => state.api.apiBase);
    const user = useSelector((state) => state.user);
    const theme = useContext(siteTheme);
    const {searchQuery, setSearchQuery} = useContext(searchContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showLogout, setShowLogout] = useState(false);

    const handleApiSwitch = (e) => {
        const newApiBase = e.target.value;
        if (newApiBase !== apiBase) {
            if (window.confirm("Switching backend will log you out. Continue?")) {
                dispatch(Signoff());
                dispatch(SetApiBase(newApiBase));
                navit("/");
            } else {
                e.target.value = apiBase;
            }
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const logoutBtn = () => {
        dispatch(Signoff());
        infoMsg('Youre now logged out, see you soon!');
        setTimeout(() => navit("/"), 1000);
    };

    return (
        <div className="navbar" style={{ backgroundColor: theme.background, color: theme.color }}>
            <div className="logo">
                <NavLink to="/">IE Directory</NavLink>
                    <select id="backend-switcher" name="dbselector" value={apiBase} onChange={handleApiSwitch}>
                        <option value={campusApi}>DB: Campus Backend</option>
                        <option value={myApi}>DB: IE Backend</option>
                    </select>
            </div>

            {isMobileMenuOpen && (
                <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
            )}
            <div className={`site-nav ${isMobileMenuOpen ? "active" : ""}`}>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">About</NavLink>
                    </li>
                    {(user.user._id) && ( <>
                            <li>
                                <NavLink to="/liked-cards">Liked Cards</NavLink>
                            </li>
                        </> )}
                    {user.user.isBusiness && ( <>
                            <li>
                                <NavLink to="/business/user">My Cards</NavLink>
                            </li>
                            <li>
                                <NavLink to="/business/add-business">Add Card</NavLink>
                            </li>
                            
                        </> )}
                    {user.user.isAdmin && ( <>
                            <li>
                                <NavLink to="/sandbox-crm">Sandbox CRM</NavLink>
                            </li>
                    </> )}
                    {user?.token && ( 
                    <li>
                        <NavLink to={`sandbox-crm/user/${user.user._id}`}>Profile</NavLink>
                    </li>
                    )}
                </ul>
            </div>

            <div className="search-bar">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>

            <div className="themer">
                <button onClick={toggleTheme}>
                    {darkMode ? <Moon size={25} /> : <Sun size={25} />}
                </button>
            </div>
            
            
            
            <div className="user-nav">
                {user.token === "" ? (
                    <div className="user-nav-log" >
                        <NavLink to="/register">Register</NavLink>
                        <NavLink to="/login">Login</NavLink>
                    </div>
                ) : (
                    <div className="logout-btn" style={{ display: "flex", flexDirection: "column" }}>
                        <button className="user-img" onClick={() => setShowLogout(!showLogout)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                            <SquareUserRound size={28} />
                        </button>
                        {showLogout && <button onClick={logoutBtn}>LOGOUT</button>}
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