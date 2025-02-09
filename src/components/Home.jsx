import { useContext } from "react";
import Cards from "./Cards";
import Greeting from "./Greeting";
import { siteTheme } from "../App";
import { useSelector } from "react-redux";

function Home() {
    const theme = useContext(siteTheme);
    const user = useSelector((state) => state.user);
    return (<>
        <header className="header-container">
            <h1>IE Business Directory</h1>
        </header>

    <div style={{ backgroundColor: theme.background, color: theme.color, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"1.5em"}}>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1em", boxShadow: " 0px 0px 25px 5px #ffffff10", borderRadius: "10px", padding: ".5em 1em", maxWidth:"80%" }}>
        
        <div className="intro-box">
            <h2>Discover Businesses, Showcase your Business.</h2>

            {user.user._id == "" && <>
                <p >Welcome to IE Directory – your ultimate platform for discovering businesses and forging meaningful connections.
                    <br />
                    Whether you're showcasing your expertise or exploring industries, we make business discovery effortless and inspiring.
                    <br />
                    Join us today to connect, collaborate, and grow.</p>
            </>}
        </div>
            <Greeting />
        </div>
            <Cards />       
    </div>
    </>);
}
export default Home;